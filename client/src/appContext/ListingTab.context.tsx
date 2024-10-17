import { createContext, useContext, useState } from "react";

type ListingTabContextType = {
  matchaTab: boolean;
  viewTab: boolean;
  likeTab: boolean;
  matchTab: boolean;
  visitedTab: boolean;
  likedTab: boolean;
  banTab: boolean;
  setMatchaTab: React.Dispatch<React.SetStateAction<boolean>>;
  setViewTab: React.Dispatch<React.SetStateAction<boolean>>;
  setLikeTab: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchTab: React.Dispatch<React.SetStateAction<boolean>>;
  setVisitedTab: React.Dispatch<React.SetStateAction<boolean>>;
  setLikedTab: React.Dispatch<React.SetStateAction<boolean>>;
  setBanTab: React.Dispatch<React.SetStateAction<boolean>>;
  setAlltabOff: () => void;
};

export const ListingTabContext = createContext<ListingTabContextType>({
  matchaTab: false,
  viewTab: false,
  likeTab: false,
  matchTab: false,
  visitedTab: false,
  likedTab: false,
  banTab: false,
  setMatchaTab: () => {},
  setViewTab: () => {},
  setLikeTab: () => {},
  setMatchTab: () => {},
  setVisitedTab: () => {},
  setLikedTab: () => {},
  setBanTab: () => {},
  setAlltabOff: () => {},
});

const ListingTabProvider = ({ children }: { children: React.ReactNode }) => {
  const [matchaTab, setMatchaTab] = useState<boolean>(false);
  const [viewTab, setViewTab] = useState<boolean>(false);
  const [likeTab, setLikeTab] = useState<boolean>(false);
  const [matchTab, setMatchTab] = useState<boolean>(false);
  const [visitedTab, setVisitedTab] = useState<boolean>(false);
  const [likedTab, setLikedTab] = useState<boolean>(false);
  const [banTab, setBanTab] = useState<boolean>(false);
  const setAlltabOff = () => {
    setMatchaTab(false);
    setViewTab(false);
    setLikeTab(false);
    setMatchTab(false);
    setVisitedTab(false);
    setLikedTab(false);
    setBanTab(false);
  };

  return (
    <ListingTabContext.Provider
      value={{
        matchaTab,
        viewTab,
        likeTab,
        matchTab,
        visitedTab,
        likedTab,
        banTab,
        setMatchaTab,
        setViewTab,
        setLikeTab,
        setMatchTab,
        setVisitedTab,
        setLikedTab,
        setBanTab,
        setAlltabOff,
      }}
    >
      {children}
    </ListingTabContext.Provider>
  );
};

export default ListingTabProvider;
export const useListingTab = () => useContext(ListingTabContext);
