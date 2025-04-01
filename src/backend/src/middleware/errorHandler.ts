import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    logger.error(`Operational error: ${err.message}`);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    return;
  }

  logger.error(`Unexpected error: ${err.message}`);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
