import { createContext, useContext, useState } from 'react';
import { ProfileFrontType } from '../appConfig/interface';

type MemoryContextType = {
  listingName: string | null;
  setListingName: React.Dispatch<React.SetStateAction<string | null>>;
  listing: ProfileFrontType[] | null;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;

  activeChatUserId: number | null;
  setActiveChatUserId: React.Dispatch<React.SetStateAction<number | null>>;

  activeProfileId: number | null;
  setActiveProfileId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const MemoryContext = createContext<MemoryContextType>({
  listingName: null,
  setListingName: () => {},
  listing: null,
  setListing: () => {},
  activeChatUserId: null,
  setActiveChatUserId: () => {},
  activeProfileId: null,
  setActiveProfileId: () => {},
});

const MemoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [listingName, setListingName] = useState<string | null>(null);
  const [listing, setListing] = useState<ProfileFrontType[] | null>(null);
  const [activeChatUserId, setActiveChatUserId] = useState<number | null>(null);
  const [activeProfileId, setActiveProfileId] = useState<number | null>(null);

  return (
    <MemoryContext.Provider
      value={{
        listingName,
        setListingName,
        listing,
        setListing,
        activeChatUserId,
        setActiveChatUserId,
        activeProfileId,
        setActiveProfileId,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export default MemoryProvider;
export const useMemory = () => useContext(MemoryContext);
