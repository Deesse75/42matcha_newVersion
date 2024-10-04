import { Response } from 'express';

export class matchaError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static catched(error: Error, res: Response): Response {
    if (error instanceof matchaError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
}
