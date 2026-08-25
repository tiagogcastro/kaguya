import { readFileSync } from 'node:fs';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3399';

let passed = 0;
let failed = 0;
const failures = [];

async function call(name, method, path, { token, body, raw } = {}) {
  const headers = {};
  if (!raw && body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE}${path}`, {
    method,
    headers,
    ...(body === undefined ? {} : { body: raw ? body : JSON.stringify(body) }),
  });

  let data = null;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  return { name, response, data };
}

function check(result, expectedStatus, validate) {
  const { name, response, data } = result;
  const errors = [];

  if (response.status !== expectedStatus) {
    errors.push(`expected ${expectedStatus}, got ${response.status}: ${JSON.stringify(data).slice(0, 160)}`);
  }
  if (validate && response.status === expectedStatus) {
    try {
      validate(data);
    } catch (error) {
      errors.push(`shape: ${error.message}`);
    }
  }

  if (errors.length) {
    failed += 1;
    failures.push(`${name}: ${errors.join(' | ')}`);
    console.log(`FAIL ${name} -> ${errors.join(' | ')}`);
  } else {
    passed += 1;
    console.log(`PASS ${name} (${response.status})`);
  }

  return data;
}

const unique = Date.now();

const adminCreds = {
  email: process.env.ADMIN_ACCESS || 'app@kaguya.com.br',
  password: process.env.ADMIN_PASS || 'app12345',
};

const newUserIdentity = {
  email: `smoke.${unique}@kaguya.dev`,
  username: `smoke${unique}`,
  password: 'smoke12345',
};

const main = async () => {
  console.log(`Smoke testing ${BASE}\n`);

  const register = await call('register user', 'POST', '/users', { body: newUserIdentity });
  check(register, 201, data => {
    if (!data.token) throw new Error('no token');
  });
  const userToken = register.data.token;

  const session = await call('login user', 'POST', '/sessions', { body: newUserIdentity });
  check(session, 200, data => {
    if (!data.token || !data.user?.id) throw new Error('no token/user');
  });

  const profile = await call('show own profile', 'GET', '/profile', { token: userToken });
  check(profile, 200, data => {
    if (data.email !== newUserIdentity.email) throw new Error('wrong profile');
  });

  const validateToken = await call('validate token', 'POST', '/users/tokens/validate-token', { token: userToken });
  check(validateToken, 200);

  const trails = await call('list trails', 'GET', '/trails/list-all', { token: userToken });
  check(trails, 200, data => {
    if (!Array.isArray(data)) throw new Error('not an array');
  });
  const trailSlug = trails.data[0]?.slug;
  if (!trailSlug) throw new Error('seed a trail first');

  const trailShow = await call('show trail by slug', 'GET', `/trails/show?slug=${trailSlug}`, { token: userToken });
  check(trailShow, 200, data => {
    if (!data.id || !data.name) throw new Error('bad trail');
  });
  const trailId = trailShow.data.id;

  const playlists = await call('list playlists from trail', 'GET', `/playlists/trail-list-all?trail_id=${trailId}`, { token: userToken });
  check(playlists, 200, data => {
    if (!Array.isArray(data) || !data.length) throw new Error('no playlists');
  });
  const playlistId = playlists.data[0].id;

  const playlistShow = await call('show playlist', 'GET', `/playlists/show?playlist_id=${playlistId}`, { token: userToken });
  check(playlistShow, 200, data => {
    if (!data.id) throw new Error('bad playlist');
  });

  const blocks = await call('list blocks from playlist', 'GET', `/blocks/playlist-list-all?playlist_id=${playlistId}`, { token: userToken });
  check(blocks, 200, data => {
    if (!Array.isArray(data) || !data.length) throw new Error('no blocks');
  });
  const blockId = blocks.data[0].id;

  const lessons = await call('list lessons from block', 'GET', `/blocks/show?block_id=${blockId}`, { token: userToken });
  check(lessons, 200, data => {
    if (!data.id) throw new Error('bad block');
  });

  const lessonsList = await call('list lessons', 'GET', `/lessons/list?block_id=${blockId}`, { token: userToken });
  check(lessonsList, 200, data => {
    if (!Array.isArray(data)) throw new Error('not an array');
  });

  const prefetch = await call('prefetch lesson', 'GET', `/lessons/prefetch?trail_slug=${trailSlug}&playlist_slug=${playlists.data[0].slug}`, { token: userToken });
  check(prefetch, 200);

  const lessonShow = await call('show lesson', 'GET', `/lessons/show?lesson_id=${lessonsList.data[0]?.id}`, { token: userToken });
  check(lessonShow, 200, data => {
    if (!data.lesson && !data.id) throw new Error('bad lesson payload');
  });

  const userTrail = await call('join trail', 'POST', '/user-trails', { token: userToken, body: { trail_id: trailId } });
  check(userTrail, 201);

  const myTrails = await call('list my trails', 'GET', '/user-trails/list-all', { token: userToken });
  check(myTrails, 200, data => {
    if (!Array.isArray(data)) throw new Error('not an array');
  });

  const like = await call('mark like', 'POST', '/likes', { token: userToken, body: { lesson_id: lessonsList.data[0].id, state: 'like' } });
  check(like, 204);

  const completeLesson = await call('complete lesson', 'POST', '/lessons/change-complete-lesson', { token: userToken, body: { lesson_id: lessonsList.data[0].id } });
  check(completeLesson, 200);

  const historyCreate = await call('create history', 'POST', '/histories/create', { token: userToken, body: { lesson_id: lessonsList.data[0].id } });
  check(historyCreate, 201);

  const historiesList = await call('list own histories', 'GET', '/histories/list', { token: userToken });
  check(historiesList, 200, data => {
    if (!Array.isArray(data)) throw new Error('not an array');
  });

  const changeEnabled = await call('toggle user trail enabled', 'PATCH', '/user-trails/change-enabled', { token: userToken, body: { trail_id: trailId } });
  check(changeEnabled, 200);

  const userPlaylists = await call('list my playlists from trail', 'GET', `/user-playlists/trail-list-all?trail_id=${trailId}`, { token: userToken });
  check(userPlaylists, 200, data => {
    if (!Array.isArray(data)) throw new Error('not an array');
  });

  const rolesList = await call('list roles', 'GET', '/roles/list-all', { token: userToken });
  check(rolesList, 200);

  const associatedUsers = await call('list users from trail', 'GET', `/users/list-all-users-associated-with-trail?trail_id=${trailId}`, { token: userToken });
  check(associatedUsers, 200);

  const updateUser = await call('update user', 'PUT', '/users/update-user', { token: userToken, body: { name: `Smoke ${unique}` } });
  check(updateUser, 200);

  const pngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const form = new FormData();
  form.append(
    'avatar',
    new Blob([Buffer.from(pngBase64, 'base64')], { type: 'image/png' }),
    'avatar.png',
  );
  const avatar = await fetch(`${BASE}/users/avatar`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${userToken}` },
    body: form,
  });
  check({ name: 'update avatar', response: avatar, data: avatar.status }, 200);
  await avatar.text().catch(() => {});

  const removeUserTrail = await call('leave trail', 'DELETE', `/user-trails?trail_id=${trailId}`, { token: userToken });
  check(removeUserTrail, 200);
  const adminLogin = await call('login admin', 'POST', '/sessions', { body: adminCreds });
  check(adminLogin, 200, data => {
    if (!data.token) throw new Error('no admin token');
  });
  const adminToken = adminLogin.data.token;

  const subAdminLogin = await call('login sub admin', 'POST', '/sessions', {
    body: { email: 'sub@kaguya.com.br', password: 'sub12345' },
  });
  check(subAdminLogin, 200);
  const subAdminToken = subAdminLogin.data.token;

  const listAllUsers = await call('sub admin lists users', 'GET', '/sub-admins/users/list-all', { token: subAdminToken });
  check(listAllUsers, 200, data => {
    if (!Array.isArray(data)) throw new Error('not an array');
  });

  const createRole = await call('sub admin creates role', 'POST', '/sub-admins/roles', {
    token: subAdminToken,
    body: { role: `smoke-role-${unique}`, permission: 10 + Math.floor(Math.random() * 990000) },
  });
  check(createRole, 201);

  const createTrailAdmin = await call('sub admin creates trail', 'POST', '/sub-admins/trails', {
    token: subAdminToken,
    body: { name: `Smoke Trail ${unique}`, slug: `smoke-trail-${unique}`, description: 'created by smoke test' },
  });
  check(createTrailAdmin, 201, data => {
    if (!data.trail && !data.id && !data.name) throw new Error('bad trail');
  });
  const smokeTrailId = createTrailAdmin.data.trail?.id || createTrailAdmin.data.id;

  const updateTrail = await call('sub admin updates trail', 'PUT', '/sub-admins/trails', {
    token: subAdminToken,
    body: { trail_id: smokeTrailId, description: 'updated by smoke test' },
  });
  check(updateTrail, 200);

  const createPlaylistAdmin = await call('sub admin creates playlist', 'POST', '/sub-admins/playlists', {
    token: subAdminToken,
    body: { trail_id: smokeTrailId, name: `Smoke Playlist ${unique}`, slug: `smoke-playlist-${unique}`, description: 'created by smoke test' },
  });
  check(createPlaylistAdmin, 201);
  const smokePlaylistId = createPlaylistAdmin.data.playlist?.id || createPlaylistAdmin.data.id;

  const createBlockAdmin = await call('sub admin creates block', 'POST', '/sub-admins/blocks', {
    token: subAdminToken,
    body: { playlist_id: smokePlaylistId, name: `Smoke Block ${unique}`, slug: `smoke-block-${unique}` },
  });
  check(createBlockAdmin, 201);
  const smokeBlockId = createBlockAdmin.data.block?.id || createBlockAdmin.data.id;

  const createLessonAdmin = await call('sub admin creates lesson', 'POST', '/sub-admins/lessons', {
    token: subAdminToken,
    body: {
      block_id: smokeBlockId,
      name: `Smoke Lesson ${unique}`,
      slug: `smoke-lesson-${unique}`,
      description: 'created by smoke test',
      link: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
    },
  });
  check(createLessonAdmin, 201);
  const smokeLessonId = createLessonAdmin.data.lesson?.id || createLessonAdmin.data.id;

  const deleteLessonAdmin = await call('sub admin deletes lesson', 'DELETE', `/sub-admins/lessons?lesson_id=${smokeLessonId}`, { token: subAdminToken });
  check(deleteLessonAdmin, 200);

  const deleteBlockAdmin = await call('sub admin deletes block', 'DELETE', `/sub-admins/blocks?block_id=${smokeBlockId}`, { token: subAdminToken });
  check(deleteBlockAdmin, 200);

  const deletePlaylistAdmin = await call('sub admin deletes playlist', 'DELETE', `/sub-admins/playlists?playlist_id=${smokePlaylistId}`, { token: subAdminToken });
  check(deletePlaylistAdmin, 200);

  const deleteTrailAdmin = await call('sub admin deletes trail', 'DELETE', `/sub-admins/trails?trail_id=${smokeTrailId}`, { token: subAdminToken });
  check(deleteTrailAdmin, 200);

  const forbidden = await call('regular user blocked on sub admin route', 'GET', '/sub-admins/users/list-all', { token: userToken });
  check(forbidden, 403, data => {
    if (!data.error?.message) throw new Error('expected error envelope');
  });

  const unauthenticated = await call('unauthenticated request rejected', 'GET', '/trails/list-all');
  check(unauthenticated, 401, data => {
    if (!data.error?.message) throw new Error('expected error envelope');
  });

  const invalidPayload = await call('validation rejects bad email', 'POST', '/sessions', {
    body: { email: 'definitely-not-an-email' },
  });
  check(invalidPayload, 400, data => {
    if (!data.error?.message) throw new Error('expected error envelope');
  });

  const removeUser = await call('delete own account', 'DELETE', '/users/remove', { token: userToken });
  check(removeUser, 204);

  console.log(`\n${passed} passed, ${failed} failed`);

  if (failed > 0) {
    console.log('\nFailures:');
    failures.forEach(failure => console.log(` - ${failure}`));
    process.exit(1);
  }
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
