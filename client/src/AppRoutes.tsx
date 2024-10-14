import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { appRedir } from './appConfig/appPath';
import LoadingPage from './auth/LoadingPage';
import ValidateLinkEmail from './auth/validate/ValidateLinkEmail';
import GetMe from './home/GetMe';
import Signin from './auth/signin/Signin';
import Signup from './auth/signup/Signup';
import ForgotPassword from './auth/forgot/ForgotPassword';
import ResendLinkEmail from './auth/resend/ResendLinkEmail';
import Error500 from './error/Error500';
import Error404 from './error/Error404';
import Attribution from './footer/components/Attribution';
import ContactUs from './footer/components/ContactUs';
import Legacy from './footer/components/Legacy';
import Signout from './header/components/Signout';
import ProfilePage from './home/profile/ProfilePage';
import DeleteProfile from './home/profile/DeleteProfile';
import DashboardPage from './home/dashboard/DashboardPage';
import ChatPage from './home/chat/ChatPage';
import SearchPage from './home/search/SearchPage';
import HistoryPage from './home/history/HistoryPage';

type Props = {
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppRoutes: FC<Props> = ({
  setDisplayIconMenu,
  setMenuIsOpen,
  setSystemNotif,
}) => {
  return (
    <>
      <Routes>
        <Route
          path={appRedir.loading}
          element={
            <LoadingPage
              setMenuIsOpen={setMenuIsOpen}
              setDisplayIconMenu={setDisplayIconMenu}
              setSystemNotif={setSystemNotif}
            />
          }
        />
        <Route
          path={appRedir.signin}
          element={<Signin setSystemNotif={setSystemNotif} />}
        />
        <Route
          path={appRedir.signup}
          element={<Signup setSystemNotif={setSystemNotif} />}
        />
        <Route
          path={appRedir.forgotPassword}
          element={<ForgotPassword setSystemNotif={setSystemNotif} />}
        />
        <Route
          path={appRedir.resend}
          element={<ResendLinkEmail setSystemNotif={setSystemNotif} />}
        />
        <Route
          path={appRedir.validateLinkEmail}
          element={
            <ValidateLinkEmail
              setMenuIsOpen={setMenuIsOpen}
              setDisplayIconMenu={setDisplayIconMenu}
              setSystemNotif={setSystemNotif}
            />
          }
        />

        <Route
          path={appRedir.errorNotfound}
          element={<Error404 setMenuIsOpen={setMenuIsOpen} />}
        />
        <Route
          path={appRedir.errorInternal}
          element={<Error500 setMenuIsOpen={setMenuIsOpen} />}
        />

        <Route path={appRedir.attribution} element={<Attribution />} />
        <Route
          path={appRedir.contact}
          element={
            <ContactUs
              setSystemNotif={setSystemNotif}
              setMenuIsOpen={setMenuIsOpen}
            />
          }
        />
        <Route path={appRedir.rules} element={<Legacy />} />

        <Route
          path={appRedir.getMe}
          element={
            <GetMe
              setDisplayIconMenu={setDisplayIconMenu}
              setMenuIsOpen={setMenuIsOpen}
              setSystemNotif={setSystemNotif}
            />
          }
        />
        <Route path='/*' element={<Error404 setMenuIsOpen={setMenuIsOpen} />} />
        <Route
          path={appRedir.signout}
          element={
            <Signout
              setMenuIsOpen={setMenuIsOpen}
              setDisplayIconMenu={setDisplayIconMenu}
            />
          }
        />
        <Route path={appRedir.profile} element={<ProfilePage />} />
        <Route path={appRedir.deleteProfile} element={<DeleteProfile />} />
        <Route path={appRedir.dashboard} element={<DashboardPage />} />
        <Route path={appRedir.chat} element={<ChatPage />} />
        <Route path={appRedir.search} element={<SearchPage />} />
        <Route path={appRedir.history} element={<HistoryPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
