const PORT = import.meta.env.VITE_PORT_BACK;
const HOST = import.meta.env.VITE_HOST_BACK;
const PATH = `http://${HOST}:${PORT}`;

export const appRedir = {
  loading: '/',
  auth: '/authentification',
  signout: '/deconnexion',
  validateLinkEmail: '/validation_email',
  getMe: '/chargement',
  home: '/accueil',
  contact: '/contact',
  footer: '/informations',
  errorInternal: '/erreur_interne',
  errorServer: '/erreur_serveur',
  errorNotfound: '/page_introuvable',
};

export const authRoute = {
  init: `${PATH}/auth/init`,
  signinUsername: `${PATH}/auth/signin_username`,
  signinEmail: `${PATH}/auth/signin_Email`,
  signup: `${PATH}/auth/signup`,
  resendLinkEmail: `${PATH}/auth/resend_email`,
  forgotPassword: `${PATH}/auth/forgot_password`,
  reinitPassword: `${PATH}/auth/reinit_password`,
  ValidateLinkEmail: `${PATH}/auth/validate_email`,
};
