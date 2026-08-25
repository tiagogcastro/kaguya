import { slugRegEx } from '@/config/reg-ex';
import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { ListAllPlaylistsFromTrailController } from '../controllers/list-all-playlists-from-trail-controller';
import { ShowPlaylistController } from '../controllers/show-playlist-controller';

const playlistsRouter = Router();

const listAllPlaylistsFromTrailController =
  new ListAllPlaylistsFromTrailController();
const showPlaylistController = new ShowPlaylistController();

playlistsRouter.get(
  '/trail-list-all',
  ensureAuthenticated,
  validate({
    query: z.object({
      trail_id: z.uuid(),
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
    }),
  }),
  listAllPlaylistsFromTrailController.handle,
);

playlistsRouter.get(
  '/show',
  ensureAuthenticated,
  validate({
    query: z.object({
      playlist_id: z.uuid().optional(),
      trail_slug: z.string().regex(slugRegEx).optional(),
      playlist_slug: z.string().regex(slugRegEx).optional(),
    }),
  }),
  showPlaylistController.handle,
);

export { playlistsRouter };
