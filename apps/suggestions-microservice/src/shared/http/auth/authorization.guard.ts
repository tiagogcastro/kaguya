import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccessTokenController } from '@shared/messaging/controllers/verify-token.controller';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private accessTokenController: AccessTokenController) {

  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res } = GqlExecutionContext.create(context).getContext();

    try {
      this.accessTokenController.verify('bla');

      console.log('send')

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }
}