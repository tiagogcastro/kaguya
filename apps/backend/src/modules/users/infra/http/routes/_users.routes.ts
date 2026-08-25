import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { CreateUserController } from '../controllers/create-user-controller';
import { ListAllUsersController } from '../controllers/list-all-users-controller';
import ensureAuthenticated from '../middlewares/ensure-authenticated';
import ensureSubAdministrator from '../middlewares/ensure-sub-administrator';

const _usersRouter = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();

_usersRouter.post(
  '/users',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    body: z.object({
      email: z.email().max(100),
      name: z.string().min(2).max(100),
      username: z.string().min(2).max(100),
      password: z.string().min(8).max(100),
      role: z.string().min(2).max(100).optional(),
    }),
  }),
  createUserController.handle,
);

_usersRouter.get(
  '/users/list-all',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    query: z.object({
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
    }),
  }),
  listAllUsersController.handle,
);

export { _usersRouter };
