import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@/shared/container';
import { storageConfig } from '@/config/storage';
import { AppError } from '@/shared/errors/app-error';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(storageConfig.paths.uploadsFolder));
app.use(router);

type ErrorEnvelope = {
  data: null;
  error: {
    message: string;
    generic_code: number;
  };
};

const buildEnvelope = (
  message: string,
  genericCode: number,
): ErrorEnvelope => ({
  data: null,
  error: {
    message,
    generic_code: genericCode,
  },
});

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json(buildEnvelope(error.message, error.genericCode));
    }

    if (error instanceof MulterError) {
      const message =
        error.code === 'LIMIT_FILE_SIZE'
          ? 'File is larger than the 2 MB limit'
          : `Upload rejected: ${error.code}`;

      return response.status(400).json(buildEnvelope(message, 7));
    }

    console.error(error);

    return response
      .status(500)
      .json(buildEnvelope('Internal Server Error', 50));
  },
);

export { app };
