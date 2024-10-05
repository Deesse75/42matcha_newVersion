import { Router } from 'express';
import { forgotPassword, initializeDatabase, reinitPassword, resendEmail, signinEmail, signinUsername, signup, validateEmail } from './auth.controller.js';
import { authBodyValidation } from './validation/auth.body.validation.js';
import { authTokenValidation } from './validation/token.validation.js';
import {
  dontFindUserByEmail,
  dontFindUserByUsername,
  findUserByUsername,
  findUserByEmail,
  findUserNotCertified,
} from './validation/user.validation.js';

const authRouter = Router();

authRouter.get('/init', initializeDatabase);
authRouter.post(
  '/signup',
  authBodyValidation,
  dontFindUserByEmail,
  dontFindUserByUsername,
  signup,
);
authRouter.post(
  '/signin_username',
  authBodyValidation,
  findUserByUsername,
  signinUsername,
);
authRouter.post(
  '/signin_email',
  authBodyValidation,
  findUserByEmail,
  signinEmail,
);
authRouter.post(
  '/forgot_password',
  authBodyValidation,
  findUserByEmail,
  forgotPassword,
);
authRouter.post(
  '/resend_email',
  authBodyValidation,
  findUserNotCertified,
  resendEmail,
);
authRouter.patch(
  '/reinit_password',
  authBodyValidation,
  findUserByEmail,
  reinitPassword,
);
authRouter.post(
  '/validate_email',
  authBodyValidation,
  authTokenValidation,
  findUserNotCertified,
  validateEmail,
);

export default authRouter;
