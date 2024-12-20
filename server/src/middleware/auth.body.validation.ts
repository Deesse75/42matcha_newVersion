import { NextFunction, Request, Response } from 'express';
import { url } from 'inspector';
import Joi from 'joi';

const signinUsernameSchema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]{2,29}$'))
    .required()
    .min(3)
    .max(30),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .min(8)
    .max(30),
  region: Joi.string().allow(null).required(),
  county: Joi.string().allow(null).required(),
  town: Joi.string().allow(null).required(),
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
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .min(8)
    .max(30),
  region: Joi.string().allow(null).required(),
  county: Joi.string().allow(null).required(),
  town: Joi.string().allow(null).required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const signupSchema = Joi.object({
  firstname: Joi.string()
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$"))
    .required()
    .min(3)
    .max(30),
  lastname: Joi.string()
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$"))
    .required()
    .min(3)
    .max(30),
  username: Joi.string()
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]{2,29}$'))
    .required()
    .min(3)
    .max(30),
  birthdate: Joi.string().isoDate().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .min(8)
    .max(30),
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
    .required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const reinitPasswordSchema = Joi.object({
  code: Joi.string().pattern(new RegExp('^[0-9]{6}$')).required().min(6).max(6),
  newPassword: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .min(8)
    .max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .required(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const validateEmailSchema = Joi.object({
  url: Joi.string().required().uri(),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const contactSchema = Joi.object({
  contactName: Joi.string().required().min(3).max(30),
  contactEmail: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ['com', 'fr'] },
    })
    .required(),
  subject: Joi.string().min(1).max(100).required(),
  text: Joi.string().min(1).max(955).required(),
})
  .unknown(false)
  .messages({
    'object.unknown': 'Certains champs dans la requête ne sont pas autorisés.',
  });

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/signin_username': signinUsernameSchema,
  '/signin_email': signinEmailSchema,
  '/signup': signupSchema,
  '/forgot_password': forgotPasswordSchema,
  '/reinit_password': reinitPasswordSchema,
  '/resend_email': resendEmailSchema,
  '/validate_email': validateEmailSchema,
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
