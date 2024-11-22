import { createContext, useContext, useState } from 'react';

type SelectMenuContextType = {
  dashboardMenu: boolean;
  accountMenu: boolean;
  searchMenu: boolean;
  chatMenu: boolean;
  matchaMenu: boolean;
  matchMenu: boolean;
  viewMenu: boolean;
  likeMenu: boolean;
  visitedMenu: boolean;
  likedMenu: boolean;
  bannedMenu: boolean;
  deleteMenu: boolean;
  contactMenu: boolean;
  historySelected: string | null;
  setDashboardMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setChatMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setLikeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setVisitedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setLikedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setBannedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setContactMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setHistorySelected: React.Dispatch<React.SetStateAction<string | null>>;
  setAllMenuOff: () => void;
  setOneMenuOn: (tab: string) => void;

  displayAppMenu: boolean;
  setDisplayAppMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SelectMenuContext = createContext<SelectMenuContextType>({
  dashboardMenu: false,
  accountMenu: false,
  chatMenu: false,
  searchMenu: false,
  matchaMenu: false,
  matchMenu: false,
  viewMenu: false,
  likeMenu: false,
  visitedMenu: false,
  likedMenu: false,
  bannedMenu: false,
  deleteMenu: false,
  contactMenu: false,
  historySelected: null,
  setDashboardMenu: () => {},
  setAccountMenu: () => {},
  setChatMenu: () => {},
  setSearchMenu: () => {},
  setMatchaMenu: () => {},
  setMatchMenu: () => {},
  setViewMenu: () => {},
  setLikeMenu: () => {},
  setVisitedMenu: () => {},
  setLikedMenu: () => {},
  setBannedMenu: () => {},
  setDeleteMenu: () => {},
  setContactMenu: () => {},
  setHistorySelected: () => {},
  setAllMenuOff: () => {},
  setOneMenuOn: () => {},
  displayAppMenu: false,
  setDisplayAppMenu: () => {},
});

const SelectMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [dashboardMenu, setDashboardMenu] = useState<boolean>(false);
  const [accountMenu, setAccountMenu] = useState<boolean>(false);
  const [chatMenu, setChatMenu] = useState<boolean>(false);
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const [matchaMenu, setMatchaMenu] = useState<boolean>(false);
  const [matchMenu, setMatchMenu] = useState<boolean>(false);
  const [viewMenu, setViewMenu] = useState<boolean>(false);
  const [likeMenu, setLikeMenu] = useState<boolean>(false);
  const [visitedMenu, setVisitedMenu] = useState<boolean>(false);
  const [likedMenu, setLikedMenu] = useState<boolean>(false);
  const [bannedMenu, setBannedMenu] = useState<boolean>(false);
  const [deleteMenu, setDeleteMenu] = useState<boolean>(false);
  const [contactMenu, setContactMenu] = useState<boolean>(false);
  const [historySelected, setHistorySelected] = useState<string | null>(null);
  const [displayAppMenu, setDisplayAppMenu] = useState<boolean>(false);
  const setAllMenuOff = () => {
    setDashboardMenu(false);
    setAccountMenu(false);
    setChatMenu(false);
    setSearchMenu(false);
    setDeleteMenu(false);
    setMatchaMenu(false);
    setMatchMenu(false);
    setViewMenu(false);
    setLikeMenu(false);
    setVisitedMenu(false);
    setLikedMenu(false);
    setBannedMenu(false);
    setContactMenu(false);
    setHistorySelected(null);
  };
  const setOneMenuOn = (tab: string) => {
    const menu = [
      'dashboard',
      'account',
      'chat',
      'search',
      'matcha',
      'match',
      'view',
      'like',
      'visited',
      'liked',
      'banned',
      'delete',
      'contact',
    ];
    const setter = [
      setDashboardMenu,
      setAccountMenu,
      setChatMenu,
      setSearchMenu,
      setMatchaMenu,
      setMatchMenu,
      setViewMenu,
      setLikeMenu,
      setVisitedMenu,
      setLikedMenu,
      setBannedMenu,
      setDeleteMenu,
      setContactMenu,
    ];
    menu.forEach((item) => {
      if (item === tab) {
        setter[menu.indexOf(item)](true);
      } else {
        setter[menu.indexOf(item)](false);
      }
    });
  };

  return (
    <SelectMenuContext.Provider
      value={{
        dashboardMenu,
        accountMenu,
        chatMenu,
        searchMenu,
        matchaMenu,
        matchMenu,
        viewMenu,
        likeMenu,
        visitedMenu,
        likedMenu,
        bannedMenu,
        deleteMenu,
        contactMenu,
        historySelected,
        setDashboardMenu,
        setAccountMenu,
        setChatMenu,
        setSearchMenu,
        setMatchaMenu,
        setMatchMenu,
        setViewMenu,
        setLikeMenu,
        setVisitedMenu,
        setLikedMenu,
        setBannedMenu,
        setDeleteMenu,
        setContactMenu,
        setHistorySelected,
        setAllMenuOff,
        setOneMenuOn,
        displayAppMenu,
        setDisplayAppMenu,
      }}
    >
      {children}
    </SelectMenuContext.Provider>
  );
};

export default SelectMenuProvider;
export const useSelectMenu = () => useContext(SelectMenuContext);
