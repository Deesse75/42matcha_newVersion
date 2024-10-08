export type FullProfileType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  departement: string | null;
  ville: string | null;
  tall: number;
  biography: string | null;
  fameRating: number;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  photo4: string | null;
  photo5: string | null;
  ageMinLookFor: number;
  ageMaxLookFor: number;
  genderLookFor: string | null;
  orientationLookFor: string | null;
  locationLookFor: string | null;
  tallMinLookFor: number;
  tallMaxLookFor: number;
  withPhoto: boolean;
  withBiography: boolean;
  withConnectionOn: boolean;
  lastConnection: string;
  createdAt: string;
  updatedAt: string;
};

export type MiniProfileType = {
  id: number;
  username: string;
};

export type MediumProfileType = {
  id: number;
  username: string;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  photo: string | null;
};

export type ProfileTagsType = {
  id: number;
  userId: number;
  tag: string;
};

export type ChatDataType = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
};

export type MemoryContextType = {
  dashboard: boolean;
  newProfile: boolean;
  profile: boolean;
  chat: boolean;
  search: boolean;
  displayProfile: boolean;
  deletePage: boolean;
  setDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePage: React.Dispatch<React.SetStateAction<boolean>>;
  subPageName: string | null;
  setSubPageName: React.Dispatch<React.SetStateAction<string | null>>;
  closeAllSubPage: () => void;

  searchTab: boolean;
  matchTab: boolean;
  viewerTab: boolean;
  likerTab: boolean;
  matchaTab: boolean;
  visitedTab: boolean;
  likedTab: boolean;
  bannedTab: boolean;
  activeTab: string | null;
  setSearchTab: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchTab: React.Dispatch<React.SetStateAction<boolean>>;
  setViewerTab: React.Dispatch<React.SetStateAction<boolean>>;
  setLikerTab: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaTab: React.Dispatch<React.SetStateAction<boolean>>;
  setVisitedTab: React.Dispatch<React.SetStateAction<boolean>>;
  setLikedTab: React.Dispatch<React.SetStateAction<boolean>>;
  setBannedTab: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  closeAllTabs: () => void;

  searchResult: MediumProfileType[] | null;
  matchaList: MediumProfileType[] | null;
  likerList: MediumProfileType[] | null;
  viewerList: MediumProfileType[] | null;
  likedList: MiniProfileType[] | null;
  visitedList: MiniProfileType[] | null;
  bannedList: MiniProfileType[] | null;
  matchList: MediumProfileType[] | null;
  setSearchResult: React.Dispatch<
    React.SetStateAction<MediumProfileType[] | null>
  >;
  setMatchaList: React.Dispatch<
    React.SetStateAction<MediumProfileType[] | null>
  >;
  setLikerList: React.Dispatch<
    React.SetStateAction<MediumProfileType[] | null>
  >;
  setViewerList: React.Dispatch<
    React.SetStateAction<MediumProfileType[] | null>
  >;
  setLikedList: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setVisitedList: React.Dispatch<
    React.SetStateAction<MiniProfileType[] | null>
  >;
  setBannedList: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchList: React.Dispatch<
    React.SetStateAction<MediumProfileType[] | null>
  >;
  deleteAllList: () => void;

  reloadHistoryMenu: string | null;
  reloadProfilePage: string | null;
  reloadSearchPage: string | null;
  reloadChatPage: string | null;
  reloadDashboardPage: string | null;
  setReloadHistoryMenu: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadProfilePage: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadSearchPage: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadChatPage: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadDashboardPage: React.Dispatch<React.SetStateAction<string | null>>;
  stopReloadPage: () => void;

  displayProfileId: number;
  displayProfileData: FullProfileType | null;
  displayProfileTags: ProfileTagsType | null;
  setDisplayProfileId: React.Dispatch<React.SetStateAction<number>>;
  setDisplayProfileData: React.Dispatch<
    React.SetStateAction<FullProfileType | null>
  >;
  setDisplayProfileTags: React.Dispatch<
    React.SetStateAction<ProfileTagsType | null>
  >;
  deleteData: () => void;

  displayChatId: number;
  displayChatData: ChatDataType | null;
  setDisplayChatId: React.Dispatch<React.SetStateAction<number>>;
  setDisplayChatData: React.Dispatch<React.SetStateAction<ChatDataType | null>>;
  deleteAllMemories: () => void;
};

export const initialMemory: MemoryContextType = {
  dashboard: false,
  newProfile: false,
  profile: false,
  chat: false,
  search: false,
  displayProfile: false,
  deletePage: false,
  setDashboard: () => false,
  setNewProfile: () => false,
  setProfile: () => false,
  setChat: () => false,
  setSearch: () => false,
  setDisplayProfile: () => false,
  setDeletePage: () => false,
  subPageName: null,
  setSubPageName: () => null,
  closeAllSubPage: () => {},
  searchTab: false,
  matchTab: false,
  viewerTab: false,
  likerTab: false,
  matchaTab: false,
  visitedTab: false,
  likedTab: false,
  bannedTab: false,
  setSearchTab: () => false,
  setMatchTab: () => false,
  setViewerTab: () => false,
  setLikerTab: () => false,
  setMatchaTab: () => false,
  setVisitedTab: () => false,
  setLikedTab: () => false,
  setBannedTab: () => false,
  activeTab: null,
  setActiveTab: () => null,
  closeAllTabs: () => {},
  searchResult: null,
  matchList: null,
  viewerList: null,
  likerList: null,
  matchaList: null,
  visitedList: null,
  likedList: null,
  bannedList: null,
  setSearchResult: () => null,
  setMatchList: () => null,
  setViewerList: () => null,
  setLikerList: () => null,
  setMatchaList: () => null,
  setVisitedList: () => null,
  setLikedList: () => null,
  setBannedList: () => null,
  deleteAllList: () => {},
  reloadHistoryMenu: null,
  reloadProfilePage: null,
  reloadChatPage: null,
  reloadSearchPage: null,
  reloadDashboardPage: null,
  setReloadHistoryMenu: () => null,
  setReloadProfilePage: () => null,
  setReloadChatPage: () => null,
  setReloadSearchPage: () => null,
  setReloadDashboardPage: () => null,
  stopReloadPage: () => {},
  displayProfileId: 0,
  setDisplayProfileId: () => 0,
  displayProfileData: null,
  setDisplayProfileData: () => null,
  displayProfileTags: null,
  setDisplayProfileTags: () => null,
  displayChatId: 0,
  setDisplayChatId: () => 0,
  displayChatData: null,
  setDisplayChatData: () => null,
  deleteData: () => {},
  deleteAllMemories: () => {},
};


