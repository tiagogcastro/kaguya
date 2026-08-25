import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/app-error';

import { authConfig } from '@config/auth';
import { prisma } from '@shared/infra/prisma/connection';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  exp: number;
  iat: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 8, 401);
  }

  const [, token] = authHeader.split(' ');

  let sub: string;

  try {
    const decoded = verify(token, authConfig.secret);

    sub = (decoded as ITokenPayload).sub;
  } catch {
    throw new AppError('Invalid JWT token', 77, 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: sub,
    },
    select: {
      enabled: true,
    },
  });

  if (!user || !user.enabled) {
    throw new AppError('User does not exist or is disabled', 5, 401);
  }

  request.user = {
    id: sub,
  };

  return next();
}
