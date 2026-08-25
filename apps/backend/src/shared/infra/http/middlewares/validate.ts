import { AppError } from '@shared/errors/app-error';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';

type RequestSchemas = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

const formatIssue = (error: ZodError): string => {
  const issue = error.issues[0];
  const path = issue.path.join('.');

  return path ? `${path}: ${issue.message}` : issue.message;
};

const validate =
  (schemas: RequestSchemas) =>
  (request: Request, _: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        request.body = schemas.body.parse(request.body ?? {});
      }

      if (schemas.query) {
        request.query = schemas.query.parse(
          request.query,
        ) as typeof request.query;
      }

      if (schemas.params) {
        request.params = schemas.params.parse(
          request.params,
        ) as typeof request.params;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError(formatIssue(error), 1, 400);
      }

      throw error;
    }

    return next();
  };

export { validate };
