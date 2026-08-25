import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ensureSubAdministrator from '@modules/users/infra/http/middlewares/ensure-sub-administrator';
import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { CreateLessonController } from '../controllers/create-lesson-controller';
import { DeleteLessonController } from '../controllers/delete-lesson-controller';

const _lessonsRouter = Router();

const createLessonController = new CreateLessonController();
const deleteLessonController = new DeleteLessonController();

_lessonsRouter.post(
  '/lessons',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    body: z.object({
      link: z.string(),
      name: z.string().max(100),
      slug: z.string().regex(slugRegEx),
      description: z.string().max(1000),
      block_id: z.uuid(),
    }),
  }),
  createLessonController.handle,
);

_lessonsRouter.delete(
  '/lessons',
  ensureAuthenticated,
  ensureSubAdministrator,
  validate({
    query: z.object({
      lesson_id: z.uuid(),
    }),
  }),
  deleteLessonController.handle,
);

export { _lessonsRouter };
