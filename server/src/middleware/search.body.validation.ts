import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const searchMultiSchema = Joi.object({
  ageMin: Joi.number().integer().min(18).max(120).empty(null),
  ageMax: Joi.number().integer().min(18).max(120).empty(null),
  tallMin: Joi.number().integer().min(50).max(250).empty(null),
  tallMax: Joi.number().integer().min(50).max(250).empty(null),
  gender: Joi.string()
    .empty(null)
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
    ),
  orientation: Joi.string()
    .empty(null)
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
    ),
  fameRatingMin: Joi.number().integer().min(0).empty(null),
  withPhoto: Joi.string().valid(0, 1, false, true).required(),
  withBio: Joi.string().valid(0, 1, false, true).required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/search_multi': searchMultiSchema,
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
