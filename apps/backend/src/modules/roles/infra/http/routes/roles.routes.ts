import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { ListAllRolesController } from '../controllers/list-all-roles-controller';

const rolesRouter = Router();

const listAllRolesController = new ListAllRolesController();

rolesRouter.get(
  '/list-all',
  ensureAuthenticated,
  validate({
    query: z.object({
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
    }),
  }),
  listAllRolesController.handle,
);

export { rolesRouter };
