import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const ageFilterSchema = Joi.object({
  listingName: Joi.string()
    .required()
    .allow(
      'matcha',
      'match',
      'view',
      'like',
      'visited',
      'liked',
      'banned',
      'mute',
      'search',
    ),
  ageMin: Joi.number().integer().min(18).max(120).required(),
  ageMax: Joi.number().integer().min(18).max(120).required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const fameFilterSchema = Joi.object({
  listingName: Joi.string()
    .required()
    .allow(
      'matcha',
      'match',
      'view',
      'like',
      'visited',
      'liked',
      'banned',
      'mute',
      'search',
    ),
  fameMin: Joi.number().min(0).required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const locationFilterSchema = Joi.object({
  listingName: Joi.string()
    .required()
    .allow(
      'matcha',
      'match',
      'view',
      'like',
      'visited',
      'liked',
      'banned',
      'mute',
      'search',
    ),
  zone: Joi.string().empty().required().allow('town', 'county', 'region'),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const tagsFilterSchema = Joi.object({
  listingName: Joi.string()
    .required()
    .allow(
      'matcha',
      'match',
      'view',
      'like',
      'visited',
      'liked',
      'banned',
      'mute',
      'search',
    ),
  tags: Joi.array().items(Joi.string().empty().min(1).required()),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/get_age_filter': ageFilterSchema,
  '/get_fame_filter': fameFilterSchema,
  '/get_location_filter': locationFilterSchema,
  '/get_tags_filter': tagsFilterSchema,
};

export const listingBodyValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log('path', req.path);
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
