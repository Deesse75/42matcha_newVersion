import { useState, useContext, createContext } from "react";
import { Socket } from "socket.io-client";

export type UserInfoType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: string | null;
  age: number;
  gender: string | null;
  orientation: string | null;
  region: string | null;
  departement: string | null;
  ville: string | null;
  tall: number;
  biography: string | null;
  fameRating: number;
  photo1: Buffer | null;
  photo2: Buffer | null;
  photo3: Buffer | null;
  photo4: Buffer | null;
  photo5: Buffer | null;
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

type UserContextType = {
  user: UserInfoType | null;
  userSocket: Socket | null;
  userTags: string[] | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfoType | null>>;
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
  const [user, setUser] = useState<UserInfoType | null>(null);
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
