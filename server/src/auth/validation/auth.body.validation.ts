import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const signinUsernameSchema = Joi.object({
  username: Joi.string()
    .empty()
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]{2,29}$'))
    .required()
    .messages({
      'string.empty': "Le nom d'utilisateur ne doit pas être vide",
      'string.pattern.base':
        "Le format du nom d'utilisateur est invalide. Voir les règles de saisie",
      'any.required': "Le nom d'utilisateur est requis.",
    }),
  password: Joi.string()
    .empty()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .messages({
      'string.empty': 'Le mot de passe ne doit pas être vide',
      'string.pattern.base':
        'Le format du mot de passe est invalide. Voir les règles de saisie',
      'any.required': 'Le mot de passe est requis.',
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

export const signinEmailSchema = Joi.object({
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
  password: Joi.string()
    .empty()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .messages({
      'string.empty': 'Le mot de passe ne doit pas être vide',
      'string.pattern.base':
        'Le format du mot de passe est invalide. Voir les règles de saisie',
      'any.required': 'Le mot de passe est requis.',
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

export const signupSchema = Joi.object({
  firstname: Joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$"))
    .required()
    .messages({
      'string.empty': 'Le prénom ne doit pas être vide',
      'string.pattern.base':
        'Le format du prénom est invalide. Voir les règles de saisie',
      'any.required': 'Le prénom est requis.',
    }),
  lastname: Joi.string()
    .empty()
    .pattern(new RegExp("^[a-zA-Z][a-zA-Z- ']{2,29}$"))
    .required()
    .messages({
      'string.empty': 'Le nom ne doit pas être vide',
      'string.pattern.base':
        'Le format du nom est invalide. Voir les règles de saisie',
      'any.required': 'Le nom est requis.',
    }),
  username: Joi.string()
    .empty()
    .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_@]{2,29}$'))
    .required()
    .messages({
      'string.empty': "Le nom d'utilisateur ne doit pas être vide",
      'string.pattern.base':
        "Le format du nom d'utilisateur est invalide. Voir les règles de saisie",
      'any.required': "Le nom d'utilisateur est requis.",
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
  password: Joi.string()
    .empty()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@])[a-zA-Z0-9!?@]{8,30}$',
      ),
    )
    .required()
    .messages({
      'string.empty': 'Le mot de passe ne doit pas être vide',
      'string.pattern.base':
        'Le format du mot de passe est invalide. Voir les règles de saisie',
      'any.required': 'Le mot de passe est requis.',
    }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

export const resendEmailSchema = Joi.object({
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

export const forgotPasswordSchema = Joi.object({
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

export const reinitPasswordSchema = Joi.object({
  code: Joi.string()
    .empty()
    .pattern(new RegExp('^[0-9]{6}$'))
    .required()
    .messages({
      'string.empty': 'Le code ne doit pas être vide',
      'string.pattern.base': 'Le code est incorrect.',
      'any.required': 'Le code est requis.',
    }),
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

export const validateEmailSchema = Joi.object({
  url: Joi.string().empty().uri().required().messages({
    'string.empty': "L'URL ne doit pas être vide",
    'string.uri': "L'URL est invalide.",
    'any.required': "L'URL est requise.",
  }),
})
  .unknown(false)
  .messages({
    'objet.unknown': 'La requete est invalide.',
  });

const schemaMap: { [key: string]: Joi.ObjectSchema } = {
  '/signin_username': signinUsernameSchema,
  '/signin_Email': signinEmailSchema,
  '/signup': signupSchema,
  '/forgot_password': forgotPasswordSchema,
  '/validate_email': validateEmailSchema,
  '/reinit_password': reinitPasswordSchema,
  '/resend_email': resendEmailSchema,
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
