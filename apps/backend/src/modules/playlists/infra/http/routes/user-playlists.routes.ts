import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { ListAllUserPlaylistsFromTrailController } from '../controllers/list-all-user-playlists-from-trail-controller';

const userPlaylistsRouter = Router();

const listAllUserPlaylistsFromTrailController =
  new ListAllUserPlaylistsFromTrailController();

userPlaylistsRouter.get(
  '/trail-list-all',
  ensureAuthenticated,
  validate({
    query: z.object({
      trail_id: z.uuid(),
    }),
  }),
  listAllUserPlaylistsFromTrailController.handle,
);

export { userPlaylistsRouter };
