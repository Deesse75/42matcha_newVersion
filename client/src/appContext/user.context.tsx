import { useState, useContext, createContext } from 'react';
import { Socket } from 'socket.io-client';
import {
  PhotosPlusFrontType,
  UserFrontType,
  UserLastSearchFrontType,
  UserNotifFrontType,
  UserTagsFrontType,
} from '../appConfig/interface';

type UserContextType = {
  user: UserFrontType | null;
  userTags: UserTagsFrontType[] | null;
  userPhotosPlus: PhotosPlusFrontType | null;
  userLastSearch: UserLastSearchFrontType | null;
  userNotif: UserNotifFrontType[] | null;
  userSocket: Socket | null;
  setUser: React.Dispatch<React.SetStateAction<UserFrontType | null>>;
  setUserTags: React.Dispatch<React.SetStateAction<UserTagsFrontType[] | null>>;
  setUserPhotosPlus: React.Dispatch<
    React.SetStateAction<PhotosPlusFrontType | null>
  >;
  setUserLastSearch: React.Dispatch<
    React.SetStateAction<UserLastSearchFrontType | null>
  >;
  setUserNotif: React.Dispatch<
    React.SetStateAction<UserNotifFrontType[] | null>
  >;
  setUserSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userTags: null,
  userPhotosPlus: null,
  userLastSearch: null,
  userNotif: null,
  userSocket: null,
  setUser: () => {},
  setUserTags: () => {},
  setUserPhotosPlus: () => {},
  setUserLastSearch: () => {},
  setUserNotif: () => {},
  setUserSocket: () => {},
  deleteUserData: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserFrontType | null>(null);
  const [userTags, setUserTags] = useState<UserTagsFrontType[] | null>(null);
  const [userPhotosPlus, setUserPhotosPlus] =
    useState<PhotosPlusFrontType | null>(null);
  const [userLastSearch, setUserLastSearch] =
    useState<UserLastSearchFrontType | null>(null);
  const [userNotif, setUserNotif] = useState<UserNotifFrontType[] | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUser(null);
    setUserTags(null);
    setUserPhotosPlus(null);
    setUserLastSearch(null);
    setUserNotif(null);
    setUserSocket(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userTags,
        userPhotosPlus,
        userLastSearch,
        userNotif,
        userSocket,
        setUser,
        setUserTags,
        setUserPhotosPlus,
        setUserLastSearch,
        setUserNotif,
        setUserSocket,
        deleteUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserInfo = () => useContext(UserContext);
