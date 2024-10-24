import { useState, useContext, createContext } from "react";
import { Socket } from "socket.io-client";
import { FullProfileType } from "../appConfig/interface";

type UserContextType = {
  user: FullProfileType | null;
  userSocket: Socket | null;
  setUser: React.Dispatch<React.SetStateAction<FullProfileType | null>>;
  setUserSocket: React.Dispatch<React.SetStateAction<Socket | null>>;

  historySelected: string | null;
  setHistorySelected: React.Dispatch<React.SetStateAction<string | null>>;
  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userSocket: null,
  setUser: () => {},
  setUserSocket: () => {},
  historySelected: null,
  setHistorySelected: () => {},
  deleteUserData: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FullProfileType | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const [historySelected, setHistorySelected] = useState<string | null>(null);
  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUser(null);
    setUserSocket(null);
    setHistorySelected(null);
  };

  return (
    <UserContext.Provider
    value={{
      user,
      userSocket,
      setUser,
      setUserSocket,
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
