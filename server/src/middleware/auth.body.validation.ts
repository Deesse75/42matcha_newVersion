import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const signinUsernameSchema = Joi.object({
  username: Joi.string()
    .empty()
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]{2,29}$'))
    .required(),
  password: Joi.string()
    .empty()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required(),
  region: Joi.string().empty().required(),
  county: Joi.string().empty().required(),
  town: Joi.string().empty().required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const signinEmailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .empty()
    .required(),
  password: Joi.string()
    .empty()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required(),
  region: Joi.string().empty().required(),
  county: Joi.string().empty().required(),
  town: Joi.string().empty().required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const signupSchema = Joi.object({
  firstname: Joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$"))
    .required(),
  lastname: Joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$"))
    .required(),
  username: Joi.string()
    .empty()
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]{2,29}$'))
    .required(),
  birthdate: Joi.string().isoDate().empty().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .empty()
    .required(),
  password: Joi.string()
    .empty()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const resendEmailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .empty()
    .required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .empty()
    .required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const reinitPasswordSchema = Joi.object({
  code: Joi.string()
    .empty()
    .pattern(new RegExp('^[0-9]{6}$'))
    .required(),
  newPassword: Joi.string()
    .empty()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .messages({
      'string.empty': 'Le nouveau mot de passe ne doit pas être vide',
      'string.pattern.base':
        'Le format du nouveau mot de passe est invalide. Voir les règles de saisie',
      'any.required': 'Le nouveau mot de passe est requis.',
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .empty()
    .required()
    .messages({
      'string.email':
        "Le format de l'adresse email est invalide. Voir les règles de saisie",
      'string.empty': "L'adresse email ne doit pas être vide",
      'any.required': "L'adresse email est requise.",
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const validateEmailSchema = Joi.object({
  url: Joi.string().empty().uri().required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

export const contactSchema = Joi.object({
  contactName: Joi.string()
    .empty()
    .required(),
  contactEmail: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .empty()
    .required(),
  subject: Joi.string().empty().max(100).required(),
  text: Joi.string().empty().max(955).required(),
})
  .unknown(false)
  .messages({
    'object.unknown': 'Certains champs dans la requête ne sont pas autorisés.',
  });


const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/signin_username': signinUsernameSchema,
  '/signin_Email': signinEmailSchema,
  '/signup': signupSchema,
  '/forgot_password': forgotPasswordSchema,
  '/validate_email': validateEmailSchema,
  '/reinit_password': reinitPasswordSchema,
  '/resend_email': resendEmailSchema,
  '/contact_us': contactSchema,
};

export const authBodyValidation = async (
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
