import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const searchAdvanceSchema = Joi.object({
  ageMin: Joi.number().integer().min(18).max(120).required(),
  ageMax: Joi.number().integer().min(18).max(120).required(),
  tallMin: Joi.number().integer().min(100).max(250).required(),
  tallMax: Joi.number().integer().min(100).max(250).required(),
  gender: Joi.string()
    .required()
    .valid(
      'Homme',
      'Femme',
      'Non-binaire',
      'Agenre',
      'Bigenre',
      'Genre fluide',
      'Femme transgenre',
      'Homme transgenre',
      'Pangenre',
      'Autre',
    )
    .allow(null)
    .messages({
      'string.base': 'Le genre est invalide',
    }),
  orientation: Joi.string()
    .required()
    .valid(
      'Hétérosexuel(le)',
      'Homosexuel(le)',
      'Bisexuel(le)',
      'Pansexuel(le)',
      'Asexuel(le)',
      'Demisexuel(le)',
      'Sapiosexuel(le)',
      'Polysexuel(le)',
      'Queer',
      'Skoliosexuel(le)',
      'Graysexuel(le)',
      'Autre',
    )
    .allow(null)
    .messages({
      'string.base': 'L orientation sexuelle est invalide',
    }),
  advancePhoto: Joi.string().valid(0, 1, false, true).required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/search_advance': searchAdvanceSchema,
};

export const searchBodyValidation = async (
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
