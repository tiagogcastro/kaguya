import { storageConfig } from '@/config/storage';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { UpdateUserAvatarController } from '../controllers/update-user-avatar-controller';
import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { CreateUserController } from '../controllers/create-user-controller';
import { DisableUserController } from '../controllers/disable-user-controller';
import { ListTheUsersAssociatedWithTheTrailController } from '../controllers/list-the-users-associated-with-the-trail-controller';
import { RemoveUserController } from '../controllers/remove-user-controller';
import { UpdateUserController } from '../controllers/update-user-controller';
import { ValidateTokenController } from '../controllers/validate-token-controller';
import ensureAuthenticated from '../middlewares/ensure-authenticated';

const usersRouter = Router();
const upload = multer(storageConfig.multer);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const validateTokenController = new ValidateTokenController();
const listTheUsersAssociatedWithTheTrailController =
  new ListTheUsersAssociatedWithTheTrailController();
const disableUserController = new DisableUserController();
const removeUserController = new RemoveUserController();

const updateUserController = new UpdateUserController();

usersRouter.post(
  '/',
  validate({
    body: z.object({
      email: z.email().max(100),
      username: z.string().min(2).max(100),
      password: z.string().min(8).max(100),
    }),
  }),
  createUserController.handle,
);

usersRouter.post('/tokens/validate-token', validateTokenController.handle);

usersRouter.get(
  '/list-all-users-associated-with-trail',
  ensureAuthenticated,
  validate({
    query: z.object({
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
      trail_id: z.uuid(),
    }),
  }),
  listTheUsersAssociatedWithTheTrailController.handle,
);

usersRouter.patch('/disable', ensureAuthenticated, disableUserController.handle);

usersRouter.delete('/remove', ensureAuthenticated, removeUserController.handle);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

usersRouter.put(
  '/update-user',
  ensureAuthenticated,
  validate({
    body: z.object({
      name: z.string().min(2).max(100).optional(),
      username: z.string().min(2).max(100).optional(),
      password: z
        .union([z.literal(''), z.string().min(8).max(100)])
        .optional(),
    }),
  }),
  updateUserController.handle,
);

export { usersRouter };
