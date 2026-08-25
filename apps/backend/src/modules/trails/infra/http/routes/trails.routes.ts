import { slugRegEx } from '@/config/reg-ex';
import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensure-authenticated';
import { validate } from '@/shared/infra/http/middlewares/validate';
import { Router } from 'express';
import { z } from 'zod';
import { ListAllTrailsController } from '../controllers/list-all-trails-controller';
import { ShowTrailController } from '../controllers/show-trail-controller';

const trailsRouter = Router();

const listAllTrailsController = new ListAllTrailsController();
const showTrailController = new ShowTrailController();

const booleanQuery = z.preprocess(
  value => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  },
  z.boolean().optional(),
);

trailsRouter.get(
  '/list-all',
  ensureAuthenticated,
  validate({
    query: z.object({
      skip: z.coerce.number().int().nonnegative().optional(),
      take: z.coerce.number().int().positive().optional(),
      order: z.enum(['asc', 'desc']).optional(),
      exclude_my_trails: booleanQuery,
    }),
  }),
  listAllTrailsController.handle,
);

trailsRouter.get(
  '/show',
  ensureAuthenticated,
  validate({
    query: z.object({
      trail_id: z.uuid().optional(),
      slug: z.string().regex(slugRegEx).optional(),
    }),
  }),
  showTrailController.handle,
);

export { trailsRouter };
