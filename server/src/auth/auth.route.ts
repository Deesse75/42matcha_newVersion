import { Router } from 'express';
import {
  contactUs,
  forgotPassword,
  initializeDatabase,
  reinitPassword,
  resendEmail,
  signinEmail,
  signinUsername,
  signup,
  validateEmail,
} from './auth.controller.js';
import { authBodyValidation } from '../middleware/auth.body.validation.js';
import { authTokenValidation } from '../middleware/authToken.validation.js';
import {
  authUserValidation,
  birthdateValidation,
  isEmailCertified,
} from '../middleware/auth.data.validation.js';

const authRouter = Router();

authRouter.get('/init', initializeDatabase);
authRouter.post(
  '/signup',
  authBodyValidation,
  birthdateValidation,
  authUserValidation,
  signup,
);
authRouter.post(
  '/signin_username',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  signinUsername,
);
authRouter.post(
  '/signin_email',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  signinEmail,
);
authRouter.post(
  '/forgot_password',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  forgotPassword,
);
authRouter.post(
  '/resend_email',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  resendEmail,
);
authRouter.patch(
  '/reinit_password',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  reinitPassword,
);
authRouter.post(
  '/validate_email',
  authBodyValidation,
  authTokenValidation,
  authUserValidation,
  isEmailCertified,
  validateEmail,
);

authRouter.post('/contact_us', authBodyValidation, contactUs,);

export default authRouter;
