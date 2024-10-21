import { createContext, useContext, useState } from 'react';
import { FullProfileType, ProfilePlusType } from '../appConfig/interface';

type DisplayProfileContextType = {
  displayProfileId: number;
  displayProfileData: FullProfileType | null;
  displayProfilePlus: ProfilePlusType | null;
  displayProfileTags: string[] | null;
  setDisplayProfileId: React.Dispatch<React.SetStateAction<number>>;
  setDisplayProfileData: React.Dispatch<
    React.SetStateAction<FullProfileType | null>
  >;
  setDisplayProfilePlus: React.Dispatch<
    React.SetStateAction<ProfilePlusType | null>
  >;
  setDisplayProfileTags: React.Dispatch<React.SetStateAction<string[] | null>>;
  deleteAllProfileData: () => void;
};

export const DisplayProfileContext = createContext<DisplayProfileContextType>({
  displayProfileId: 0,
  displayProfileData: null,
  displayProfilePlus: null,
  displayProfileTags: null,
  setDisplayProfileId: () => {},
  setDisplayProfileData: () => {},
  setDisplayProfilePlus: () => {},
  setDisplayProfileTags: () => {},
  deleteAllProfileData: () => {},
});

const DisplayProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [displayProfileId, setDisplayProfileId] = useState<number>(0);
  const [displayProfileData, setDisplayProfileData] =
    useState<FullProfileType | null>(null);
  const [displayProfilePlus, setDisplayProfilePlus] =
    useState<ProfilePlusType | null>(null);
  const [displayProfileTags, setDisplayProfileTags] = useState<string[] | null>(
    null,
  );
  const deleteAllProfileData = () => {
    setDisplayProfileId(0);
    setDisplayProfileData(null);
    setDisplayProfilePlus(null);
    setDisplayProfileTags(null);
  };
  return (
    <DisplayProfileContext.Provider
      value={{
        displayProfileId,
        displayProfileData,
        displayProfilePlus,
        displayProfileTags,
        setDisplayProfileId,
        setDisplayProfileData,
        setDisplayProfilePlus,
        setDisplayProfileTags,
        deleteAllProfileData,
      }}
    >
      {children}
    </DisplayProfileContext.Provider>
  );
};

export default DisplayProfileProvider;
export const useDisplayProfile = () => useContext(DisplayProfileContext);
