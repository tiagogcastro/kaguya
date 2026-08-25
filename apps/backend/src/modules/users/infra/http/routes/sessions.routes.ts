import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';
import { makeAuthenticateUserByProviderControllerFactory } from '../../factories/make-authenticate-user-by-provider-controller-factory';

const sessionsRouter = Router();

const authenticadeUserController = new AuthenticateUserController();
const authenticateUserByProviderController =
  makeAuthenticateUserByProviderControllerFactory();

sessionsRouter.post(
  '/',
  validate({
    body: z.object({
      email: z.email(),
      password: z.string(),
    }),
  }),
  authenticadeUserController.handle,
);

sessionsRouter.post(
  '/auth-provider',
  validate({
    body: z.object({
      access_token: z.string().min(1),
    }),
  }),
  authenticateUserByProviderController.handle,
);

export { sessionsRouter };
