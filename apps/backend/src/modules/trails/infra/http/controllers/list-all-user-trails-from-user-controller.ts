import { ITrail } from '@/modules/trails/domain/entities/itrail';
import { ListAllUserTrailsFromUserService } from '@/modules/trails/services/list-all-user-trails-from-user-service';
import { instanceToInstance } from '@/shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllUserTrailsFromUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order, skip, take, enabled } = request.query as {
      order?: 'asc' | 'desc';
      skip?: number;
      take?: number;
      enabled?: boolean;
    };

    const listAllUserTrailsFromUser = container.resolve(
      ListAllUserTrailsFromUserService,
    );

    const user_logged_id = request.user.id;

    const trails = await listAllUserTrailsFromUser.execute({
      user_id: user_logged_id,
      order,
      skip,
      take,
      enabled,
    });

    return response
      .status(200)
      .json(
        trails.map(trail =>
          instanceToInstance('trail', trail as unknown as ITrail),
        ),
      );
  }
}
