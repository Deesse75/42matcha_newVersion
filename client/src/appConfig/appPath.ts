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
  profile: '/modification_profil_personnel',
  dashboard: 'accueil',
  chat: '/chat',
  search: '/recherche',
  history: '/historique_de_navigation',
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
  matchaList: `${PATH}/user/matcha_list`,
};

export const profileRoute = {
  getDisplayProfile: `${PATH}/profile/get_display_profile`,
  getDisplayTags: `${PATH}/profile/get_display_tags`,
  getInteractions: `${PATH}/profile/get_interactions`,
};

export const listingRoute = {
  getMatchaList: `${PATH}/listing/get_matcha_list`,
  getMatchList: `${PATH}/listing/get_match_list`,
  getViewList: `${PATH}/listing/get_view_list`,
  getLikeList: `${PATH}/listing/get_like_list`,
  getVisitedList: `${PATH}/listing/get_visited_list`,
  getLikedList: `${PATH}/listing/get_liked_list`,
  getBannedList: `${PATH}/listing/get_banned_list`,
  getAgeFilterMatchaList: `${PATH}/listing/get_age_filter_matcha_list`,
  getAgeFilterViewList: `${PATH}/listing/get_age_filter_view_list`,
  getAgeFilterLikeList: `${PATH}/listing/get_age_filter_like_list`,
  getFameFilterMatchaList: `${PATH}/listing/get_fame_filter_matcha_list`,
  getFameFilterViewList: `${PATH}/listing/get_fame_filter_view_list`,
  getFameFilterLikeList: `${PATH}/listing/get_fame_filter_like_list`,
  getLocationFilterMatchaList: `${PATH}/listing/get_location_filter_matcha_list`,
  getLocationFilterViewList: `${PATH}/listing/get_location_filter_view_list`,
  getLocationFilterLikeList: `${PATH}/listing/get_location_filter_like_list`,
  getGeolocFilterMatchaList: `${PATH}/listing/get_geoloc_filter_matcha_list`,
  getGeolocFilterViewList: `${PATH}/listing/get_geoloc_filter_view_list`,
  getGeolocFilterLikeList: `${PATH}/listing/get_geoloc_filter_like_list`,
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
