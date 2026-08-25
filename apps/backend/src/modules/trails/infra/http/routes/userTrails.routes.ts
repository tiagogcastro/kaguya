import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { ChangeUserTrailEnabledFieldController } from '../controllers/change-user-trail-enabled-field-controller';
import { CreateUserTrailController } from '../controllers/create-user-trail-controller';
import { ListAllUserTrailsFromUserController } from '../controllers/list-all-user-trails-from-user-controller';
import { RemoveUserTrailController } from '../controllers/remove-user-trail-controller';

const userTrailsRouter = Router();

const createUserTrailController = new CreateUserTrailController();
const removeUserTrailController = new RemoveUserTrailController();
const listAllUserTrailsFromUserController =
  new ListAllUserTrailsFromUserController();
const changeUserTrailEnabledFieldController =
  new ChangeUserTrailEnabledFieldController();

userTrailsRouter.use(ensureAuthenticated);

userTrailsRouter.post(
  '/',
  validate({
    body: z.object({
      trail_id: z.uuid(),
    }),
  }),
  createUserTrailController.handle,
);

userTrailsRouter.patch(
  '/change-enabled',
  validate({
    body: z.object({
      trail_id: z.uuid(),
    }),
  }),
  changeUserTrailEnabledFieldController.handle,
);

userTrailsRouter.get(
  '/list-all',
  validate({
    query: z.object({
      order: z.enum(['asc', 'desc']).optional(),
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      enabled: z.preprocess(
        value => {
          if (value === 'true') return true;
          if (value === 'false') return false;

          return value;
        },
        z.boolean().default(true),
      ),
    }),
  }),
  listAllUserTrailsFromUserController.handle,
);

userTrailsRouter.delete(
  '/',
  validate({
    query: z.object({
      trail_id: z.uuid(),
    }),
  }),
  removeUserTrailController.handle,
);

export { userTrailsRouter };
