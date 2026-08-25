import { ListHistoriesService } from '@/modules/histories/services/list-histories-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListHistoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order, skip, take } = request.query as {
      order?: 'asc' | 'desc';
      skip?: number;
      take?: number;
    };

    const user_id = request.user.id;

    const listHistoriesService = container.resolve(ListHistoriesService);

    const histories = await listHistoriesService.execute({
      user_id,
      order,
      skip,
      take,
    });

    return response.status(200).json(histories);
  }
}
