import { useState, useContext, createContext } from "react";
import { initialPageContext, PagesContextType } from "./pages.interface";

export const PagesContext = createContext<PagesContextType>(initialPageContext);

const PagesProvider = ({ children }: { children: React.ReactNode }) => {

  const closeAllPages = () => {
    setSigninPage(false);
    setSignupPage(false);
    setResendEmailPage(false);
    setForgotPasswordPage(false);
    setDashboardPage(false);
    setNewUserPage(false);
    setProfilePage(false);
    setChatPage(false);
    setSearchPage(false);
    setDisplayProfilePage(false);
    setDeletePage(false);
  };
  return (
    <PagesContext.Provider
      value={{
        signinPage,
        signupPage,
        resendEmailPage,
        forgotPasswordPage,
        setSigninPage,
        setSignupPage,
        setResendEmailPage,
        setForgotPasswordPage,
        dashboardPage,
        newUserPage,
        profilePage,
        chatPage,
        searchPage,
        displayProfilePage,
        deletePage,
        setDashboardPage,
        setNewUserPage,
        setProfilePage,
        setChatPage,
        setSearchPage,
        setDeletePage,
        setDisplayProfilePage,
        closeAllPages,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

export default PagesProvider;
export const usePages = () => useContext(PagesContext);
