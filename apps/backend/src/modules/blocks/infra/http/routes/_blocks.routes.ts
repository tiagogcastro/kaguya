import { slugRegEx } from '@/config/reg-ex';
import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@/modules/users/infra/http/middlewares/ensure-sub-administrator';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { CreateBlockController } from '../controllers/create-block-controller';
import { DeleteBlockController } from '../controllers/delete-block-controller';

const _blocksRouter = Router();

const createBlockController = new CreateBlockController();
const deleteBlockController = new DeleteBlockController();

_blocksRouter.post(
  '/blocks',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    body: z.object({
      name: z.string().max(100),
      slug: z.string().regex(slugRegEx),
      playlist_id: z.uuid(),
    }),
  }),
  createBlockController.handle,
);

_blocksRouter.delete(
  '/blocks',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    query: z.object({
      block_id: z.uuid(),
    }),
  }),
  deleteBlockController.handle,
);

export { _blocksRouter };
