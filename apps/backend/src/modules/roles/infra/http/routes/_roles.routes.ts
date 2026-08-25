import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { CreateRoleController } from '../controllers/create-role-controller';

const _rolesRouter = Router();

const createRoleController = new CreateRoleController();

_rolesRouter.post(
  '/roles',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    body: z.object({
      permission: z.coerce.number().int().nonnegative(),
      role: z.string().min(2).max(100).optional(),
    }),
  }),
  createRoleController.handle,
);

export { _rolesRouter };
