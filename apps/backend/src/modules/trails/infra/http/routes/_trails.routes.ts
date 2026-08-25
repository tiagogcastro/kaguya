import { slugRegEx } from '@/config/reg-ex';
import { storageConfig } from '@/config/storage';
import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@/modules/users/infra/http/middlewares/ensure-sub-administrator';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { CreateTrailController } from '../controllers/create-trail-controller';
import { DestroyTrailController } from '../controllers/destroy-trail-controller';
import { UpdateTrailAvatarController } from '../controllers/update-trail-avatar-controller';
import { UpdateTrailController } from '../controllers/update-trail-controller';

const _trailsRouter = Router();

const createTrailController = new CreateTrailController();
const destroyTrailController = new DestroyTrailController();
const updateTrailController = new UpdateTrailController();
const updateTrailAvatarController = new UpdateTrailAvatarController();

const upload = multer(storageConfig.multer);

_trailsRouter.post(
  '/trails',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    body: z.object({
      name: z.string().max(100),
      slug: z.string().regex(slugRegEx),
      description: z.string().max(1000),
    }),
  }),
  createTrailController.handle,
);

_trailsRouter.delete(
  '/trails',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    query: z.object({
      trail_id: z.uuid(),
    }),
  }),
  destroyTrailController.handle,
);

_trailsRouter.put(
  '/trails',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    body: z.object({
      trail_id: z.uuid(),
      name: z.string().max(100).optional(),
      slug: z.string().regex(slugRegEx).optional(),
      description: z.string().max(1000).optional(),
    }),
  }),
  updateTrailController.handle,
);

_trailsRouter.patch(
  '/trails/avatar',
  ensureAuthenticated,
  ensureSubAdministrator,
  upload.single('avatar'),
  updateTrailAvatarController.handle,
);

export { _trailsRouter };
