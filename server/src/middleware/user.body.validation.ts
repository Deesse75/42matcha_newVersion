import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const updatePhotoProfileSchema = Joi.object({
  photo: Joi.string().required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const updatePhotoPlusSchema = Joi.object({
  photo: Joi.string().required(),
  index: Joi.number().required().min(2).max(5),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const updateUserDataSchema = Joi.object({
  firstname: Joi.string().empty(null)
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$")),
  lastname: Joi.string().empty(null)
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$")),
  username: Joi.string().empty(null)
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]{2,29}$')),
  birthdate: Joi.string().isoDate().empty(null),
  })
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

  
  const updateEmailSchema = Joi.object({
    currentPassword: Joi.string()
      .empty()
      .required()
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
        ),
      ),
    newEmail: Joi.string()
      .allow(null)
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 3,
        tlds: { allow: ['com', 'fr'] },
      }),
  })
    .unknown(false)
    .messages({
      'objet.unknown': 'La requete est invalide.',
    });

  const updatePasswordSchema = Joi.object({
  activePassword: Joi.string()
    .empty()
    .required()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    ),
  newPassword: Joi.string()
    .empty()
    .required()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    ),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const addTagSchema = Joi.object({
  newTag: Joi.string().required().max(20),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const updateProfileDataSchema = Joi.object({
  gender: Joi.string()
    .allow(null)
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
      'delete',
    ),
  orientation: Joi.string()
    .allow(null)
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
      'delete',
    ),
  tall: Joi.number().allow(null).min(0).max(250),
  biography: Joi.string().allow(null).max(450),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const updateLookForSchema = Joi.object({
  ageMin: Joi.number().allow(null).min(18).max(120),
  ageMax: Joi.number().allow(null).min(18).max(120),
  tallMin: Joi.number().allow(null).min(0).max(250),
  tallMax: Joi.number().allow(null).min(0).max(250),
  gender: Joi.string()
    .allow(null)
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
      'delete',
    ),
  withPhoto: Joi.boolean().required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/update_photo_profile': updatePhotoProfileSchema,
  '/update_user_data': updateUserDataSchema,
  '/update_profile_data': updateProfileDataSchema,
  '/add_tag': addTagSchema,
  '/update_look_for': updateLookForSchema,
  '/update_photo_plus': updatePhotoPlusSchema,
  '/update_password': updatePasswordSchema,
  '/update_email': updateEmailSchema,
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
