import { Router } from 'express';
import {
  contactUs,
  forgotPassword,
  initializeDatabase,
  reinitPassword,
  resendEmail,
  signin,
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

const authRoute = Router();

authRoute.get('/init', initializeDatabase);
authRoute.post(
  '/signup',
  authBodyValidation,
  birthdateValidation,
  authUserValidation,
  signup,
);
authRoute.post(
  '/signin_username',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  signin,
);
authRoute.post(
  '/signin_email',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  signin,
);
authRoute.post(
  '/forgot_password',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  forgotPassword,
);
authRoute.post(
  '/resend_email',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  resendEmail,
);
authRoute.patch(
  '/reinit_password',
  authBodyValidation,
  authUserValidation,
  isEmailCertified,
  reinitPassword,
);
authRoute.post(
  '/validate_email',
  authBodyValidation,
  authTokenValidation,
  authUserValidation,
  isEmailCertified,
  validateEmail,
);

authRoute.post('/contact_us', authBodyValidation, contactUs);

export default authRoute;
