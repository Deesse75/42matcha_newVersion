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
  dashboard: '/tableau_de_bord',
  account: '/mon_profil',
  search: '/rechercher_des_profils',
  chat: '/discussion_instantanee',
  history: '/historique_de_navigation',
  contact: '/contact',
  errorInternal: '/erreur_interne',
  errorNotfound: '/page_introuvable',
  getMe: '/chargement',
  deleteAccount: '/suppression_du_compte',
};

  export const authRoute = {
    init: `${PATH}/auth/init`,
    signup: `${PATH}/auth/signup`,
    signinUsername: `${PATH}/auth/signin_username`,
    signinEmail: `${PATH}/auth/signin_Email`,
    forgotPassword: `${PATH}/auth/forgot_password`,
    resendLinkEmail: `${PATH}/auth/resend_email`,
    reinitPassword: `${PATH}/auth/reinit_password`,
    ValidateLinkEmail: `${PATH}/auth/validate_email`,
    contactUs: `${PATH}/auth/contact_us`,
  };

export const mailerRoute = {
  contactUs: `${PATH}/mailer/contactUs`,
};


  
  // attribution: '/attribution',
  // photo: '/photos_de_profil',
  // rules: '/regles_de_saisie',
  // legacy: '/mentions_legales',
  // errorServer: '/erreur_serveur',
  // listingMatcha: '/selection_matcha',
  // listing: '/liste_de_profils',
  // userProfile: '/profil_utilisateur',

export const userRoute = {
  getMe: `${PATH}/user/get_me`,
  getUserData: `${PATH}/user/get_user_data`,
  getUserTags: `${PATH}/user/get_user_tags`,
  updatePhotoProfile: `${PATH}/user/update_photo_profile`,
  deletePhotoProfile: `${PATH}/user/delete_photo_profile`,
  updateProfileData: `${PATH}/user/update_profile_data`,
  updateFirstData: `${PATH}/user/update_first_data`,
  updateLookFor: `${PATH}/user/update_look_for`,
  addTags: `${PATH}/user/add_tags`,
  deleteTag: `${PATH}/user/delete_tag`,
  deleteAccount: `${PATH}/user/delete_account`,

  // getPhotos: `${PATH}/user/get_photos`,
  // sendEmailNewPassword: `${PATH}/user/send_email_new_password`,
};

// export const profileRoute = {
//   getDisplayProfile: `${PATH}/profile/get_display_profile`,
//   getDisplayTags: `${PATH}/profile/get_display_tags`,
// };

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
  searchTags: `${PATH}/search/search_tags`,
  // searchAgeFilter: `${PATH}/search/search_age_filter`,
};

export const chatRoute = {
  getMicroMatchList: `${PATH}/chat/get_micro_match_list`,
//   getChatStat: `${PATH}/chat/get_chat_stat`,
//   markMessageSeen: `${PATH}/chat/mark_message_seen`,
//   getUnseenMessage: `${PATH}/chat/get_unseen_message`,
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
export const actionRoute = {
  getInteractions: `${PATH}/action/get_interactions`,
};
