import { FC, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appRedir } from './appConfig/appPath';
import AccountPage from './pages/Account';
import ChatPage from './pages/Chat';
import Dashboard from './pages/Dashboard';
import DeleteAccount from './pages/DeleteAccount';
import Error500 from './pages/Error500';
import ErrorNotFound from './pages/ErrorNotFound';
import ForgotPassword from './pages/ForgotPassword';
import GetMe from './pages/GetMe';
import Loading from './pages/Loading';
import PhotoProfile from './pages/PhotoProfile';
import ResendEmail from './pages/ResendEmail';
import SearchPage from './pages/Search';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Signup from './pages/Signup';
import ValidateEmail from './pages/ValidateEmail';
import HistoryPage from './pages/History';
import ContactUs from './pages/ContactUs';
import DisplayProfil from './pages/DisplayProfil';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppRoutes: FC<Props> = ({ setMatchaNotif }) => {

  return (
    <>
      <Routes>
        {/* logged out */}
        <Route
          path={appRedir.loading}
          element={<Loading setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.signin}
          element={<Signin setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.signup}
          element={<Signup setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.forgotPassword}
          element={<ForgotPassword setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.resend}
          element={<ResendEmail setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.validateEmail}
          element={<ValidateEmail setMatchaNotif={setMatchaNotif} />}
        />

        {/* both */}
        <Route path={appRedir.errorNotfound} element={<ErrorNotFound />} />
        <Route path={appRedir.errorInternal} element={<Error500 />} />
        <Route
          path={appRedir.contact}
          element={<ContactUs setMatchaNotif={setMatchaNotif} />}
        />

        {/* logged in */}
        <Route
          path={appRedir.getMe}
          element={<GetMe setMatchaNotif={setMatchaNotif} />}
        />
        <Route path={appRedir.signout} element={<Signout />} />
        <Route
          path={appRedir.account}
          element={
            <AccountPage
              setMatchaNotif={setMatchaNotif}
            />
          }
        />
        <Route
          path={appRedir.updatePhotos}
          element={
            <PhotoProfile
              setMatchaNotif={setMatchaNotif}
            />
          }
        />
        <Route
          path={appRedir.deleteAccount}
          element={<DeleteAccount setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.dashboard}
          element={<Dashboard setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.chat}
          element={<ChatPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.search}
          element={<SearchPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.history}
          element={<HistoryPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.displayProfil}
          element={<DisplayProfil setMatchaNotif={setMatchaNotif} />}
        />

        {/* wrong page */}
        <Route path='/*' element={<ErrorNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
