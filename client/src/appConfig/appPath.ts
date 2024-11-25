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
  validateEmail: '/validation_email',

  getMe: '/chargement',
  signout: '/deconnexion',
  dashboard: '/tableau_de_bord',
  account: '/mon_profil',
  search: '/rechercher_des_profils',
  chat: '/discussion_instantanee',
  history: '/historique_de_navigation',
  updatePhotos: '/modification_photos',
  displayProfil: '/affichage_profil',
  contact: '/contact',
  deleteAccount: '/suppression_du_compte',
  errorInternal: '/erreur_interne',
  errorNotfound: '/page_introuvable',
};

export const authRoute = {
  init: `${PATH}/auth/init`,
  signup: `${PATH}/auth/signup`,
  signinUsername: `${PATH}/auth/signin_username`,
  signinEmail: `${PATH}/auth/signin_email`,
  forgotPassword: `${PATH}/auth/forgot_password`,
  resendEmail: `${PATH}/auth/resend_email`,
  reinitPassword: `${PATH}/auth/reinit_password`,
  validateEmail: `${PATH}/auth/validate_email`,
  contactUs: `${PATH}/auth/contact_us`,
};

export const userRoute = {
  getMe: `${PATH}/user/get_me`,
  getUserData: `${PATH}/user/get_user_data`,
  getUserTags: `${PATH}/user/get_user_tags`,
  getUserPhotosPlus: `${PATH}/user/get_user_photos_plus`,
  getNewToken: `${PATH}/user/get_new_token`,
  updateUsertData: `${PATH}/user/update_user_data`,
  updatePassword: `${PATH}/user/update_password`,
  updateEmail: `${PATH}/user/update_email`,
  updateBio: `${PATH}/user/update_bio`,
  addTag: `${PATH}/user/add_tag`,
  deleteTag: `${PATH}/user/delete_tag`,
  updateProfileData: `${PATH}/user/update_profile_data`,
  updatePhotoProfile: `${PATH}/user/update_photo_profile`,
  updateOnePhotoPlus: `${PATH}/user/update_one_photo_plus`,
  deletePhotoProfile: `${PATH}/user/delete_photo_profile`,
  deleteOnePhotoPlus: `${PATH}/user/delete_one_photo_plus`,
  deleteAccount: `${PATH}/user/delete_account`,
};

export const listingRoute = {
  getAgeFilter: `${PATH}/listing/get_age_filter`,
  getLocationFilter: `${PATH}/listing/get_location_filter`,
  getFameFilter: `${PATH}/listing/get_fame_filter`,
  getTagsFilter: `${PATH}/listing/get_tags_filter`,
  getListing: `${PATH}/listing/get_listing`,
};

export const searchRoute = {
  searchMulti: `${PATH}/search/search_multi`,
  searchUsername: `${PATH}/search/search_username`,
  searchLocation: `${PATH}/search/search_location`,
  searchTag: `${PATH}/search/search_tag`,
  getLastSearch: `${PATH}/search/get_last_search`,
};

export const profileRoute = {
  getProfile: `${PATH}/profile/get_profile`,
};

export const chatRoute = {
  getMicroMatchList: `${PATH}/chat/get_micro_match_list`,
  getChatActiveList: `${PATH}/chat/get_chat_active_list`,
  //   getChatStat: `${PATH}/chat/get_chat_stat`,
  //   markMessageSeen: `${PATH}/chat/mark_message_seen`,
  //   getUnseenMessage: `${PATH}/chat/get_unseen_message`,
};

export const socketRoute = {
  path: `${PATH}`,
  connected: 'connected', //getMe.tsx
  connection_failed: 'connection_failed', //getMe.tsx
  validEmail: 'validEmail',
  updateToken: 'updateToken',

  isConnected: 'isUserConnected',
  receptIsConnected: 'receptIsConnected',

  // newDisconnect: 'newDisconnect',
  // sendView: 'sendView', //{receiverId: number}
  // sendLike: 'sendLike', //{senderUsername: string, receiverId: number}
  // sendDislike: 'sendDislike', //{senderUsername: string, receiverId: number}
  // sendBan: 'sendBan', //{receiverId: number}
  // receptView: 'receptView', // {senderUsername: string}
  // receptLike: 'receptLike', // {senderUsernq,e: string}
  // receptDislike: 'receptDislike', // {senderUsername: string}
  // receptBan: 'receptBan', //vide
};
export const actionRoute = {
  getInteractions: `${PATH}/action/get_interactions`,
  actionLike: `${PATH}/action/action_like`,
  deleteLike: `${PATH}/action/delete_like`,
  actionView: `${PATH}/action/action_view`,
  actionBan: `${PATH}/action/action_ban`,
};
