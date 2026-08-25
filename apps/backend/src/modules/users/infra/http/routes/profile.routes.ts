import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { ShowUserProfileController } from '../controllers/show-user-profile-controller';
import ensureAuthenticated from '../middlewares/ensure-authenticated';

const profileRouter = Router();

const showUserProfileController = new ShowUserProfileController();

profileRouter.get(
  '/',
  ensureAuthenticated,
  validate({
    query: z.object({
      username: z.string().min(2).max(100).optional(),
    }),
  }),
  showUserProfileController.handle,
);

export { profileRouter };
