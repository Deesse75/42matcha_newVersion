import { MediumProfileType, MiniProfileType, FullProfileType, ProfileTagsType, ChatDataType } from "../appConfig/interface";

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
  setDashboard: () => {},
  setNewProfile: () => {},
  setProfile: () => {},
  setChat: () => {},
  setSearch: () => {},
  setDisplayProfile: () => {},
  setDeletePage: () => {},
  subPageName: null,
  setSubPageName: () => {},
  closeAllSubPage: () => {},
  searchTab: false,
  matchTab: false,
  viewerTab: false,
  likerTab: false,
  matchaTab: false,
  visitedTab: false,
  likedTab: false,
  bannedTab: false,
  setSearchTab: () => {},
  setMatchTab: () => {},
  setViewerTab: () => {},
  setLikerTab: () => {},
  setMatchaTab: () => {},
  setVisitedTab: () => {},
  setLikedTab: () => {},
  setBannedTab: () => {},
  activeTab: null,
  setActiveTab: () => {},
  closeAllTabs: () => {},
  searchResult: null,
  matchList: null,
  viewerList: null,
  likerList: null,
  matchaList: null,
  visitedList: null,
  likedList: null,
  bannedList: null,
  setSearchResult: () => {},
  setMatchList: () => {},
  setViewerList: () => {},
  setLikerList: () => {},
  setMatchaList: () => {},
  setVisitedList: () => {},
  setLikedList: () => {},
  setBannedList: () => {},
  deleteAllList: () => {},
  reloadHistoryMenu: null,
  reloadProfilePage: null,
  reloadChatPage: null,
  reloadSearchPage: null,
  reloadDashboardPage: null,
  setReloadHistoryMenu: () => {},
  setReloadProfilePage: () => {},
  setReloadChatPage: () => {},
  setReloadSearchPage: () => {},
  setReloadDashboardPage: () => {},
  stopReloadPage: () => {},
  displayProfileId: 0,
  setDisplayProfileId: () => {},
  displayProfileData: null,
  setDisplayProfileData: () => {},
  displayProfileTags: null,
  setDisplayProfileTags: () => {},
  displayChatId: 0,
  setDisplayChatId: () => {},
  displayChatData: null,
  setDisplayChatData: () => {},
  deleteData: () => {},
  deleteAllMemories: () => {},
};


