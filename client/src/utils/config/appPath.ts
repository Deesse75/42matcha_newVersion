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

export const userRoute = {
  getMe: `${PATH}/user/get_me`,
};

export const socketRoute = {
  path: `${PATH}`,
  connected: 'connected',
  connectFailed: 'connection_failed',
  newConnection: 'newConnection',
  newDisconnect: 'newDisconnect',
  isConnected: 'isUserConnected',
  receptIsConnected: 'receptIsConnected',
  sendView: 'sendView', //{receiverId: number}
  sendLike: 'sendLike', //{senderUsername: string, receiverId: number}
  sendDislike: 'sendDislike', //{senderUsername: string, receiverId: number}
  sendBan: 'sendBan', //{receiverId: number}
  receptView: 'receptView', // {senderUsername: string}
  receptLike: 'receptLike', // {senderUsernq,e: string}
  receptDislike: 'receptDislike', // {senderUsername: string}
  receptBan: 'receptBan', //vide
};

