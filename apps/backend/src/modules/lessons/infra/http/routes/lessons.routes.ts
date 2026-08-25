import { slugRegEx } from '@config/reg-ex';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { ChangeCompleteUserLessonController } from '../controllers/change-complete-user-lesson-controller';
import { ListLessonsController } from '../controllers/list-lessons-service';
import { PrefetchLessonController } from '../controllers/prefetch-lesson-controller';
import { ShowLessonController } from '../controllers/show-lesson-controller';

const showLessonController = new ShowLessonController();
const listLessonsController = new ListLessonsController();
const changeCompleteUserLessonController =
  new ChangeCompleteUserLessonController();
const prefetchLessonController = new PrefetchLessonController();

const lessonsRouter = Router();

lessonsRouter.get(
  '/show',
  ensureAuthenticated,
  validate({
    query: z.object({
      lesson_id: z.uuid().optional(),
      block_slug: z.string().regex(slugRegEx).optional(),
      lesson_slug: z.string().regex(slugRegEx).optional(),
    }),
  }),
  showLessonController.handle,
);

lessonsRouter.get(
  '/prefetch',
  ensureAuthenticated,
  validate({
    query: z.object({
      trail_slug: z.string().regex(slugRegEx),
      playlist_slug: z.string().regex(slugRegEx),
    }),
  }),
  prefetchLessonController.handle,
);

lessonsRouter.get(
  '/list',
  ensureAuthenticated,
  validate({
    query: z.object({
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
      block_id: z.uuid().optional(),
    }),
  }),
  listLessonsController.handle,
);

lessonsRouter.post(
  '/change-complete-lesson',
  ensureAuthenticated,
  validate({
    body: z.object({
      lesson_id: z.uuid(),
    }),
  }),
  changeCompleteUserLessonController.handle,
);

export { lessonsRouter };
