import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

  const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  };

  export const userBodyValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const schema = schemaMap[req.path];
    if (schema) {
      try {
        await schema.validateAsync(req.body, {
          abortEarly: false,
          allowUnknown: false,
        });
        return next();
      } catch (error) {
        res.status(400).json({
          message: (error as Error).message,
        });
        return;
      }
    } else {
      res.status(404).json({
        message: "La ressource que vous essayez d'atteindre n'existe pas.",
      });
      return;
    }
  };


