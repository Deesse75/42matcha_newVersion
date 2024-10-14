import { useState, useContext, createContext } from "react";
import { Socket } from "socket.io-client";
import { FullProfileType } from "../appConfig/interface";

type UserContextType = {
  user: FullProfileType | null;
  userSocket: Socket | null;
  userTags: string[] | null;
  setUser: React.Dispatch<React.SetStateAction<FullProfileType | null>>;
  setUserSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  setUserTags: React.Dispatch<React.SetStateAction<string[] | null>>;
  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userSocket: null,
  userTags: null,
  setUser: () => {},
  setUserSocket: () => {},
  setUserTags: () => {},
  deleteUserData: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FullProfileType | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const [userTags, setUserTags] = useState<string[] | null>(null);
  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUser(null);
    setUserSocket(null);
    setUserTags(null);
  };

  return (
    <UserContext.Provider
    value={{
      user,
      userSocket,
      userTags,
      setUser,
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
