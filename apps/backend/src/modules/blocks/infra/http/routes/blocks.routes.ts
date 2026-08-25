import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { Router } from 'express';
import { z } from 'zod';
import { ListAllBlocksFromPlaylistController } from '../controllers/list-all-blocks-from-playlist-controller';
import { ShowBlockController } from '../controllers/show-block-controller';
import { validate } from '@shared/infra/http/middlewares/validate';

const blocksRouter = Router();

const listAllBlocksFromPlaylistController =
  new ListAllBlocksFromPlaylistController();
const showBlockController = new ShowBlockController();

blocksRouter.get(
  '/playlist-list-all',
  ensureAuthenticated,
  validate({
    query: z.object({
      playlist_id: z.uuid().optional(),
      trail_slug: z.string().regex(slugRegEx).optional(),
      playlist_slug: z.string().regex(slugRegEx).optional(),
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
    }),
  }),
  listAllBlocksFromPlaylistController.handle,
);

blocksRouter.get(
  '/show',
  ensureAuthenticated,
  validate({
    query: z.object({
      block_id: z.uuid().optional(),
      block_slug: z.string().regex(slugRegEx).optional(),
      playlist_slug: z.string().regex(slugRegEx).optional(),
    }),
  }),
  showBlockController.handle,
);

export { blocksRouter };
