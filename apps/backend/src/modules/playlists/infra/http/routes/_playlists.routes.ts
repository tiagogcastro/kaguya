import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { CreatePlaylistFromTrailController } from '../controllers/create-playlist-from-trail-controller';
import { DeletePlaylistController } from '../controllers/delete-playlist-controller';

const _playlistsRouter = Router();

const createPlaylistFromTrailController =
  new CreatePlaylistFromTrailController();
const deletePlaylistController = new DeletePlaylistController();

_playlistsRouter.post(
  '/playlists',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    body: z.object({
      name: z.string().max(100),
      slug: z.string().regex(slugRegEx),
      description: z.string().max(1000),
      trail_id: z.uuid(),
    }),
  }),
  createPlaylistFromTrailController.handle,
);

_playlistsRouter.delete(
  '/playlists',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    query: z.object({
      playlist_id: z.uuid(),
    }),
  }),
  deletePlaylistController.handle,
);

export { _playlistsRouter };
