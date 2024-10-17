import { useState, useContext, createContext } from "react";
import { Socket } from "socket.io-client";
import { FullProfileType, ProfilePlusType } from "../appConfig/interface";

type UserContextType = {
  user: FullProfileType | null;
  userLookFor: ProfilePlusType | null
  userSocket: Socket | null;
  userTags: string[] | null;
  setUser: React.Dispatch<React.SetStateAction<FullProfileType | null>>;
  setUserLookFor: React.Dispatch<React.SetStateAction<ProfilePlusType | null>>;
  setUserSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  setUserTags: React.Dispatch<React.SetStateAction<string[] | null>>;
  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userLookFor: null,
  userSocket: null,
  userTags: null,
  setUser: () => {},
  setUserLookFor: () => {},
  setUserSocket: () => {},
  setUserTags: () => {},
  deleteUserData: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FullProfileType | null>(null);
  const [userLookFor, setUserLookFor] = useState<ProfilePlusType | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const [userTags, setUserTags] = useState<string[] | null>(null);
  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUser(null);
    setUserLookFor(null);
    setUserSocket(null);
    setUserTags(null);
  };

  return (
    <UserContext.Provider
    value={{
      user,
      userLookFor,
      userSocket,
      userTags,
      setUser,
      setUserLookFor,
      setUserSocket,
      setUserTags,
      deleteUserData,
    }}
    >
    {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserInfo = () => useContext(UserContext);
