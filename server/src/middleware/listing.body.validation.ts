import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const getListingSchema = Joi.object({
  listingName: Joi.string()
    .empty()
    .required()
    .allow('matcha', 'view', 'like', 'match', 'visited', 'liked', 'banned')
    .messages({
      'any.only': 'Le nom de la liste est invalide',
      'any.required': 'Le nom de la liste est requis',
      'string.empty': 'Le nom de la liste ne doit pas être vide',
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const getAgeFilterSchema = Joi.object({
  listingName: Joi.string()
    .empty()
    .required()
    .allow('matcha', 'view', 'like', 'match', 'visited', 'liked')
    .messages({
      'any.only': 'Le nom de la liste est invalide',
      'any.required': 'Le nom de la liste est requis',
      'string.empty': 'Le nom de la liste ne doit pas être vide',
    }),
  ageMin: Joi.number().min(18).max(120).required().messages({
    'number.base': "L'âge minimum est invalide",
    'number.min': "L'âge minimum est invalide",
    'number.max': "L'âge minimum est invalide",
    'any.required': "L'âge minimum est requis",
  }),
  ageMax: Joi.number().min(18).max(120).required().messages({
    'number.base': "L'âge maximum est invalide",
    'number.min': "L'âge maximum est invalide",
    'number.max': "L'âge maximum est invalide",
    'any.required': "L'âge maximum est requis",
  }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });


const getFameFilterSchema = Joi.object({
  listingName: Joi.string()
    .empty()
    .required()
    .allow('matcha', 'view', 'like', 'match', 'visited', 'liked', 'banned')
    .messages({
      'any.only': 'Le nom de la liste est invalide',
      'any.required': 'Le nom de la liste est requis',
      'string.empty': 'Le nom de la liste ne doit pas être vide',
    }),
  fameMin: Joi.number().min(0).required().messages({
    'number.base': "Le nombre est invalide",
    'number.min': "Le nombre est invalide",
    'any.required': "Le nombre est requise",
  }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });


const getLocationFilterSchema = Joi.object({
  listingName: Joi.string()
    .empty()
    .required()
    .allow('matcha', 'view', 'like', 'match', 'visited', 'liked', 'banned')
    .messages({
      'any.only': 'Le nom de la liste est invalide',
      'any.required': 'Le nom de la liste est requis',
      'string.empty': 'Le nom de la liste ne doit pas être vide',
    }),
    zone: Joi.string().empty().required().allow('town', 'county', 'region').messages({
      'any.only': 'La zone de filtrage est invalide',
      'any.required': 'La zone de filtrage est requise',
      'string.empty': 'La zone de filtrage ne doit pas être vide',
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });


const getTagsFilterSchema = Joi.object({
  listingName: Joi.string()
    .empty()
    .required()
    .allow('matcha', 'view', 'like', 'match', 'visited', 'liked', 'banned')
    .messages({
      'any.only': 'Le nom de la liste est invalide',
      'any.required': 'Le nom de la liste est requis',
      'string.empty': 'Le nom de la liste ne doit pas être vide',
    }),
    tags: Joi.array().items(Joi.string().empty().min(1).required()).messages({
      'any.required': 'Les tags sont requis',
      'any.empty': 'Les tags ne doivent pas être vide',
      'array.min': 'Vous devez avoir au moins un tag',
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });


const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/get_listing': getListingSchema,
  '/get_age_filter': getAgeFilterSchema,
  '/get_fame_filter': getFameFilterSchema,
  '/get_location_filter': getLocationFilterSchema,
  '/get_tags_filter': getTagsFilterSchema,
};

export const listingBodyValidation = async (
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

