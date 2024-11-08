import { useState, useContext, createContext } from "react";
import { Socket } from "socket.io-client";
import { FullProfileType, MiniProfileType, SearchAdvanceRequestType } from "../appConfig/interface";

type UserContextType = {
  user: FullProfileType | null;
  userSocket: Socket | null;
  setUser: React.Dispatch<React.SetStateAction<FullProfileType | null>>;
  setUserSocket: React.Dispatch<React.SetStateAction<Socket | null>>;

  searchResult: MiniProfileType[] | null;
  setSearchResult: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  searchRequest: SearchAdvanceRequestType | null;
  setSearchRequest: React.Dispatch<React.SetStateAction<SearchAdvanceRequestType | null>>;

  activeChatId: number;
  setActiveChatId: React.Dispatch<React.SetStateAction<number>>;

  profileData: FullProfileType | null;
  setProfileData: React.Dispatch<React.SetStateAction<FullProfileType | null>>;

  historySelected: string | null;
  setHistorySelected: React.Dispatch<React.SetStateAction<string | null>>;
  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userSocket: null,
  setUser: () => {},
  setUserSocket: () => {},
  searchResult: null,
  setSearchResult: () => {},
  searchRequest: null,
  setSearchRequest: () => {},
  activeChatId: 0,
  setActiveChatId: () => {},
  profileData: null,
  setProfileData: () => {},
  historySelected: null,
  setHistorySelected: () => {},
  deleteUserData: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FullProfileType | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const [searchResult, setSearchResult] = useState<MiniProfileType[] | null>(null);
  const [searchRequest, setSearchRequest] = useState<SearchAdvanceRequestType | null>(null);
  const [activeChatId, setActiveChatId] = useState<number>(0);
  const [profileData, setProfileData] = useState<FullProfileType | null>(null);
  const [historySelected, setHistorySelected] = useState<string | null>(null);
  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUser(null);
    setUserSocket(null);
    setSearchResult(null);
    setSearchRequest(null);
    setActiveChatId(0);
    setProfileData(null);
    setHistorySelected(null);
  };

  return (
    <UserContext.Provider
    value={{
      user,
      userSocket,
      setUser,
      setUserSocket,
      searchResult,
      setSearchResult,
      searchRequest,
      setSearchRequest,
      activeChatId,
      setActiveChatId,
      profileData,
      setProfileData,
      historySelected,
      setHistorySelected,
      deleteUserData,
    }}
    >
    {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserInfo = () => useContext(UserContext);
