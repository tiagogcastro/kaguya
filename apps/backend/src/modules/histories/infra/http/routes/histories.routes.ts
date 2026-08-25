import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { CreateHistoryController } from '../controllers/create-history-controller';
import { ListHistoriesController } from '../controllers/list-histories-controller';
import { ShowHistoryController } from '../controllers/show-history-controller';

const historiesRouter = Router();

const listHistoriesController = new ListHistoriesController();
const showHistoryController = new ShowHistoryController();
const createHistoryController = new CreateHistoryController();

historiesRouter.get(
  '/list',
  ensureAuthenticated,
  validate({
    query: z.object({
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
    }),
  }),
  listHistoriesController.handle,
);

historiesRouter.get(
  '/show',
  ensureAuthenticated,
  validate({
    query: z.object({
      history_id: z.uuid(),
    }),
  }),
  showHistoryController.handle,
);

historiesRouter.post(
  '/create',
  ensureAuthenticated,
  validate({
    body: z.object({
      lesson_id: z.uuid(),
    }),
  }),
  createHistoryController.handle,
);

export { historiesRouter };
