import { createContext, useContext, useState } from 'react';

type MenuOnOffContextType = {
  dashboardMenu: boolean;
  profileMenu: boolean;
  chatMenu: boolean;
  searchMenu: boolean;
  historyMenu: boolean;
  deletePageMenu: boolean;
  setDashboardMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setChatMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setHistoryMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePageMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setAllMenuOff: () => void;
};

export const MenuOnOffContext = createContext<MenuOnOffContextType>({
  dashboardMenu: false,
  profileMenu: false,
  chatMenu: false,
  searchMenu: false,
  historyMenu: false,
  deletePageMenu: false,
  setDashboardMenu: () => {},
  setProfileMenu: () => {},
  setChatMenu: () => {},
  setSearchMenu: () => {},
  setHistoryMenu: () => {},
  setDeletePageMenu: () => {},
  setAllMenuOff: () => {},
});

const MenuOnOffProvider = ({ children }: { children: React.ReactNode }) => {
  const [dashboardMenu, setDashboardMenu] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [chatMenu, setChatMenu] = useState<boolean>(false);
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const [historyMenu, setHistoryMenu] = useState<boolean>(false);
  const [deletePageMenu, setDeletePageMenu] = useState<boolean>(false);
  const setAllMenuOff = () => {
    setDashboardMenu(false);
    setProfileMenu(false);
    setChatMenu(false);
    setSearchMenu(false);
    setHistoryMenu(false);
    setDeletePageMenu(false);
  };

  return (
    <MenuOnOffContext.Provider
      value={{
        dashboardMenu,
        profileMenu,
        chatMenu,
        searchMenu,
        historyMenu,
        deletePageMenu,
        setDashboardMenu,
        setProfileMenu,
        setChatMenu,
        setSearchMenu,
        setHistoryMenu,
        setDeletePageMenu,
        setAllMenuOff,
      }}
    >
      {children}
    </MenuOnOffContext.Provider>
  );
};

export default MenuOnOffProvider;
export const useMenuOnOff = () => useContext(MenuOnOffContext);
