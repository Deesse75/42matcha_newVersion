import { useState, useContext, createContext } from 'react';
import { Socket } from 'socket.io-client';
import {
  PhotosPlusFrontType,
  UserFrontType,
  UserTagsFrontType,
} from '../appConfig/interface';

type UserContextType = {
  user: UserFrontType | null;
  userTags: UserTagsFrontType[] | null;
  userPhotosPlus: PhotosPlusFrontType | null;
  userSocket: Socket | null;
  setUser: React.Dispatch<React.SetStateAction<UserFrontType | null>>;
  setUserTags: React.Dispatch<React.SetStateAction<UserTagsFrontType[] | null>>;
  setUserPhotosPlus: React.Dispatch<
    React.SetStateAction<PhotosPlusFrontType | null>
  >;
  setUserSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userTags: null,
  userPhotosPlus: null,
  userSocket: null,
  setUser: () => {},
  setUserTags: () => {},
  setUserPhotosPlus: () => {},
  setUserSocket: () => {},
  deleteUserData: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserFrontType | null>(null);
  const [userTags, setUserTags] = useState<UserTagsFrontType[] | null>(null);
  const [userPhotosPlus, setUserPhotosPlus] =
    useState<PhotosPlusFrontType | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUser(null);
    setUserTags(null);
    setUserPhotosPlus(null);
    setUserSocket(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userTags,
        userPhotosPlus,
        userSocket,
        setUser,
        setUserTags,
        setUserPhotosPlus,
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
