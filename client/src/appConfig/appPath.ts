const PORT = import.meta.env.VITE_PORT_BACK;
const HOST = import.meta.env.VITE_HOST_BACK;
const PATH = `http://${HOST}:${PORT}`;

export const appRedir = {
  loading: '/',
  signin: '/connexion',
  signup: '/inscription',
  forgotPassword: '/mot_de_passe_oublie',
  reinitPassword: '/reinitialisation_mot_de_passe',
  resend: '/renvoi_lien_validation',
  validateLinkEmail: '/validation_email',
  signout: '/deconnexion',
  attribution: '/attribution',
  contact: '/contact',
  rules: '/regles_de_saisie',
  legacy: '/mentions_legales',
  getMe: '/chargement',
  deleteProfile: '/suppression_profil',
  profile: '/modification_profil',
  account: '/modification_donnees_personnelles',
  photo: '/modification_photos',
  dashboard: '/accueil',
  chat: '/chat',
  search: '/recherche',
  history: '/historique_de_navigation',
  errorInternal: '/erreur_interne',
  errorServer: '/erreur_serveur',
  errorNotfound: '/page_introuvable',
  listingMatcha: '/selection_matcha',
  listing: '/liste_de_profils',
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
  getUser: `${PATH}/user/get_user`,
  updateName: `${PATH}/user/update_name`,
  updateValideEmail: `${PATH}/user/update_valide_email`,
  updatePassword: `${PATH}/user/update_password`,
  updateEmail: `${PATH}/user/update_email`,
  deletePhoto: `${PATH}/user/delete_photo`,
  updatePhoto: `${PATH}/user/update_photo`,
};

export const profileRoute = {
  getDisplayProfile: `${PATH}/profile/get_display_profile`,
  getDisplayTags: `${PATH}/profile/get_display_tags`,
  getInteractions: `${PATH}/profile/get_interactions`,
};

export const listingRoute = {
  getListing: `${PATH}/listing/get_listing`,
  getAgeFilter: `${PATH}/listing/get_age_filter`,
  getFameFilter: `${PATH}/listing/get_fame_filter`,
  getLocationFilter: `${PATH}/listing/get_location_filter`,
  getTagsFilter: `${PATH}/listing/get_tags_filter`,
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

export const mailerRoute = {
  contactUs: `${PATH}/mailer/contactUs`,
};
