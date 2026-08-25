import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { MarkAsLikeOrDislikeController } from '../controllers/mark-as-like-or-dislike-controller';

const likesRouter = Router();

const markAsLikeOrDislikeController = new MarkAsLikeOrDislikeController();

likesRouter.post(
  '/',
  ensureAuthenticated,
  validate({
    body: z.object({
      lesson_id: z.uuid(),
      state: z.enum(['like', 'dislike', 'none']),
    }),
  }),
  markAsLikeOrDislikeController.handle,
);

export { likesRouter };
