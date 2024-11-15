import { useState, useContext, createContext } from 'react';
import { Socket } from 'socket.io-client';
import {
  UserType,
  UserTagsType,
  PhotosPlusType,
  UserLastSearchType,
  UserNotifType,
  UserLookForType,
} from '../appConfig/interface';

type UserContextType = {
  user: UserType | null;
  userTags: UserTagsType[] | null;
  userPhotosPlus: PhotosPlusType | null;
  userLookFor: UserLookForType | null;
  userLastSearch: UserLastSearchType | null;
  userNotif: UserNotifType[] | null;
  userSocket: Socket | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  setUserTags: React.Dispatch<React.SetStateAction<UserTagsType[] | null>>;
  setUserPhotosPlus: React.Dispatch<
    React.SetStateAction<PhotosPlusType | null>
  >;
  setUserLookFor: React.Dispatch<React.SetStateAction<UserLookForType | null>>;
  setUserLastSearch: React.Dispatch<
    React.SetStateAction<UserLastSearchType | null>
  >;
  setUserNotif: React.Dispatch<React.SetStateAction<UserNotifType[] | null>>;
  setUserSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userTags: null,
  userPhotosPlus: null,
  userLookFor: null,
  userLastSearch: null,
  userNotif: null,
  userSocket: null,
  setUser: () => {},
  setUserTags: () => {},
  setUserPhotosPlus: () => {},
  setUserLookFor: () => {},
  setUserLastSearch: () => {},
  setUserNotif: () => {},
  setUserSocket: () => {},
  deleteUserData: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userTags, setUserTags] = useState<UserTagsType[] | null>(null);
  const [userPhotosPlus, setUserPhotosPlus] = useState<PhotosPlusType | null>(
    null,
  );
  const [userLookFor, setUserLookFor] = useState<UserLookForType | null>(null);
  const [userLastSearch, setUserLastSearch] =
    useState<UserLastSearchType | null>(null);
  const [userNotif, setUserNotif] = useState<UserNotifType[] | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUser(null);
    setUserTags(null);
    setUserPhotosPlus(null);
    setUserLookFor(null);
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
        userLookFor,
        userLastSearch,
        userNotif,
        userSocket,
        setUser,
        setUserTags,
        setUserPhotosPlus,
        setUserLookFor,
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
