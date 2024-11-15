import { createContext, useContext, useState } from 'react';
import { MiniProfileType, OpenChatListType } from '../appConfig/interface';

type MemoryContextType = {
  listingName: string | null;
  setListingName: React.Dispatch<React.SetStateAction<string | null>>;
  listing: MiniProfileType[] | null;
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;

  activeChatUserId: number | null;
  setActiveChatUserId: React.Dispatch<React.SetStateAction<number | null>>;
  openChatList: OpenChatListType[] | null;
  setOpenChatList: React.Dispatch<React.SetStateAction<OpenChatListType[] | null>>;
};

export const MemoryContext = createContext<MemoryContextType>({
  listingName: null,
  setListingName: () => {},
  listing: null,
  setListing: () => {},
  activeChatUserId: null,
  setActiveChatUserId: () => {},
  openChatList: null,
  setOpenChatList: () => {},
});

const MemoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [listingName, setListingName] = useState<string | null>(null);
  const [listing, setListing] = useState<MiniProfileType[] | null>(null);
  const [activeChatUserId, setActiveChatUserId] = useState<number | null>(null);
  const [openChatList, setOpenChatList] = useState<OpenChatListType[] | null>(null);

  return (
    <MemoryContext.Provider
      value={{
        listingName,
        setListingName,
        listing,
        setListing,
        activeChatUserId,
        setActiveChatUserId,
        openChatList,
        setOpenChatList,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export default MemoryProvider;
export const useMemory = () => useContext(MemoryContext);
