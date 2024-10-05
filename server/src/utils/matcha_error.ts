import { Response } from 'express';

export class matchaError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static catched(error: Error, res: Response): void {
    if (error instanceof matchaError) {
      res.status(error.statusCode).json({
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      message: (error as Error).message,
    });
    return;
  }
}
