import React, { createContext, useContext, useState } from 'react';
import {
  ChatDataType,
  FullProfileType,
  initialMemory,
  MediumProfileType,
  MemoryContextType,
  MiniProfileType,
  ProfileTagsType,
} from './memory.interface';

export const MemoryContext = createContext<MemoryContextType>(initialMemory);

const MemoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [dashboard, setDashboard] = useState<boolean>(false);
  const [newProfile, setNewProfile] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [chat, setChat] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);
  const [deletePage, setDeletePage] = useState<boolean>(false);
  const [subPageName, setSubPageName] = useState<string | null>(null);
  const closeAllSubPage = () => {
    setDashboard(false);
    setNewProfile(false);
    setProfile(false);
    setChat(false);
    setSearch(false);
    setDisplayProfile(false);
    setDeletePage(false);
    setSubPageName(null);
  };

  const [searchTab, setSearchTab] = useState<boolean>(false);
  const [matchTab, setMatchTab] = useState<boolean>(false);
  const [viewerTab, setViewerTab] = useState<boolean>(false);
  const [likerTab, setLikerTab] = useState<boolean>(false);
  const [matchaTab, setMatchaTab] = useState<boolean>(false);
  const [visitedTab, setVisitedTab] = useState<boolean>(false);
  const [likedTab, setLikedTab] = useState<boolean>(false);
  const [bannedTab, setBannedTab] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const closeAllTabs = () => {
    setSearchTab(false);
    setMatchTab(false);
    setViewerTab(false);
    setLikerTab(false);
    setMatchaTab(false);
    setVisitedTab(false);
    setLikedTab(false);
    setBannedTab(false);
    setActiveTab(null);
  };

  const [searchResult, setSearchResult] = useState<MediumProfileType[] | null>(
    null,
  );
  const [matchList, setMatchList] = useState<MediumProfileType[] | null>(null);
  const [visitedList, setVisitedList] = useState<MiniProfileType[] | null>(
    null,
  );
  const [likerList, setLikerList] = useState<MediumProfileType[] | null>(null);
  const [matchaList, setMatchaList] = useState<MediumProfileType[] | null>(
    null,
  );
  const [viewerList, setViewerList] = useState<MediumProfileType[] | null>(
    null,
  );
  const [likedList, setLikedList] = useState<MiniProfileType[] | null>(null);
  const [bannedList, setBannedList] = useState<MiniProfileType[] | null>(null);
  const deleteAllList = () => {
    setSearchResult(null);
    setMatchList(null);
    setVisitedList(null);
    setLikerList(null);
    setMatchaList(null);
    setViewerList(null);
    setLikedList(null);
    setBannedList(null);
  };

  const [reloadHistoryMenu, setReloadHistoryMenu] = useState<string | null>(null);
  const [reloadProfilePage, setReloadProfilePage] = useState<string | null>(null);
  const [reloadChatPage, setReloadChatPage] = useState<string | null>(null);
  const [reloadSearchPage, setReloadSearchPage] = useState<string | null>(null);
  const [reloadDashboardPage, setReloadDashboardPage] = useState<string | null>(null);
  const stopReloadPage = () => {
    setReloadHistoryMenu(null);
    setReloadProfilePage(null);
    setReloadChatPage(null);
    setReloadSearchPage(null);
    setReloadDashboardPage(null);
  };

  const [displayProfileId, setDisplayProfileId] = useState<number>(0);
  const [displayProfileData, setDisplayProfileData] = useState<FullProfileType | null>(
    null,
  );
  const [displayProfileTags, setDisplayProfileTags] = useState<ProfileTagsType | null>(null);

  const [displayChatId, setDisplayChatId] = useState<number>(0);
  const [displayChatData, setDisplayChatData] =
    useState<ChatDataType | null>(null);
  const deleteData = () => {
    setDisplayProfileId(0);
    setDisplayProfileData(null);
    setDisplayProfileTags(null);
    setDisplayChatId(0);
    setDisplayChatData(null);
  };

  const deleteAllMemories = () => {
    closeAllSubPage();
    closeAllTabs();
    deleteAllList();
    stopReloadPage();
    deleteData();
  };

  return (
    <MemoryContext.Provider
      value={{
        dashboard,
        newProfile,
        profile,
        chat,
        search,
        displayProfile,
        deletePage,
        setDashboard,
        setNewProfile,
        setProfile,
        setChat,
        setSearch,
        setDisplayProfile,
        setDeletePage,
        subPageName,
        setSubPageName,
        searchTab,
        matchTab,
        viewerTab,
        likerTab,
        matchaTab,
        visitedTab,
        likedTab,
        bannedTab,
        activeTab,
        setSearchTab,
        setMatchTab,
        setViewerTab,
        setLikerTab,
        setMatchaTab,
        setVisitedTab,
        setLikedTab,
        setBannedTab,
        setActiveTab,
        searchResult,
        matchList,
        visitedList,
        likerList,
        matchaList,
        viewerList,
        likedList,
        bannedList,
        setSearchResult,
        setMatchList,
        setVisitedList,
        setLikerList,
        setMatchaList,
        setViewerList,
        setLikedList,
        setBannedList,
        reloadHistoryMenu,
        reloadProfilePage,
        reloadChatPage,
        reloadSearchPage,
        reloadDashboardPage,
        setReloadHistoryMenu,
        setReloadProfilePage,
        setReloadChatPage,
        setReloadSearchPage,
        setReloadDashboardPage,
        displayProfileId,
        setDisplayProfileId,
        displayProfileData,
        setDisplayProfileData,
        displayProfileTags,
        setDisplayProfileTags,
        displayChatId,
        setDisplayChatId,
        displayChatData,
        setDisplayChatData,
        closeAllSubPage,
        closeAllTabs,
        deleteAllList,
        stopReloadPage,
        deleteData,
        deleteAllMemories,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export default MemoryProvider;
export const useMemory = () => useContext(MemoryContext);
