import crypto from 'crypto';
import { diskStorage, StorageEngine, MulterError } from 'multer';
import path from 'path';

export type StorageDrivers = 's3' | 'disk';

type StorageConfig = {
  driver: StorageDrivers;
  multer: {
    storage: StorageEngine;
    limits: {
      fileSize: number;
      files: number;
    };
  };
  paths: {
    tmpFolder: string;
    uploadsFolder: string;
  };
  config: {
    disk: {};
    s3: {
      bucket: string;
    };
  };
};

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const allowedMimeTypes: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
};

const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  multer: {
    limits: {
      fileSize: MAX_FILE_SIZE,
      files: 1,
    },
    storage: diskStorage({
      destination: (request, file, callback) => {
        let error: Error | null = null;

        if (!allowedMimeTypes[file.mimetype]) {
          error = new MulterError('LIMIT_UNEXPECTED_FILE');
        }

        callback(error, tmpFolder);
      },
      filename: (request, file, callback) => {
        const extension = allowedMimeTypes[file.mimetype];

        callback(null, `${crypto.randomUUID()}${extension}`);
      },
    }),
  },
  paths: {
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  },
  config: {
    disk: {},
    s3: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as StorageConfig;

export { storageConfig };
