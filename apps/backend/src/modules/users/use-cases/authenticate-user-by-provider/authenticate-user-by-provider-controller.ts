import { AppError } from '@/shared/errors/app-error';
import { instanceToInstance } from '@/shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { AuthenticateUserByProviderUseCase } from './authenticate-user-by-provider';

export class AuthenticateUserByProviderController {
  constructor(
    private readonly authenticateUserByProvider: AuthenticateUserByProviderUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { access_token } = request.body;

    const result = await this.authenticateUserByProvider.execute({
      access_token,
    });

    if (result.isLeft()) {
      throw new AppError(result.value.message, 77, 401);
    }

    const { user, token } = result.value;

    return response.json({
      user: instanceToInstance('user', user),
      token,
    });
  }
}
