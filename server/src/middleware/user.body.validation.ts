import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

const getMeSchema = Joi.object({
  region: Joi.string()
    .empty()
    .required()
    .messages({
      'string.base': 'La région est invalide',
      'any.required': 'La région est requise',
    }),
  county: Joi.string()
    .empty()
    .required()
    .messages({
      'string.base': 'Le département est invalide',
      'any.required': 'Le département est requis',
    }),
  town: Joi.string()
    .empty()
    .required()
    .messages({
      'string.base': 'La ville est invalide',
      'any.required': 'La ville est requise',
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

  const schemaMap: { [key: string]: Joi.ObjectSchema } = {
    '/get_me': getMeSchema,
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


