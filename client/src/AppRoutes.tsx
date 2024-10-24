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
import ProfilePage from './home/account/ProfilePage';
import DeleteProfile from './home/account/DeleteProfile';
import DashboardPage from './home/dashboard/DashboardPage';
import ChatPage from './home/chat/ChatPage';
import SearchPage from './home/search/SearchPage';
import HistoryPage from './home/listing/ListingPage';
import Signout from './home/Signout';
import AccountPage from './home/account/AccountPage';
import ListingPage from './home/listing/ListingPage';
import PhotoPage from './home/account/PhotoPage';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppRoutes: FC<Props> = ({ setMatchaNotif }) => {
  return (
    <>
      <Routes>
        <Route
          path={appRedir.loading}
          element={<LoadingPage setMatchaNotif={setMatchaNotif} />}
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
          element={<ResendLinkEmail setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.validateLinkEmail}
          element={<ValidateLinkEmail setMatchaNotif={setMatchaNotif} />}
        />

        <Route path={appRedir.errorNotfound} element={<Error404 />} />
        <Route path={appRedir.errorInternal} element={<Error500 />} />

        <Route path={appRedir.attribution} element={<Attribution />} />
        <Route
          path={appRedir.contact}
          element={<ContactUs setMatchaNotif={setMatchaNotif} />}
        />
        <Route path={appRedir.rules} element={<Legacy />} />

        <Route
          path={appRedir.getMe}
          element={<GetMe setMatchaNotif={setMatchaNotif} />}
        />
        <Route path={appRedir.signout} element={<Signout />} />
        <Route
          path={appRedir.profile}
          element={<ProfilePage setMatchaNotif={setMatchaNotif} />}
        />
        <Route path={appRedir.deleteProfile} element={<DeleteProfile />} />
        <Route
          path={appRedir.dashboard}
          element={<DashboardPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route path={appRedir.chat} element={<ChatPage />} />
        <Route path={appRedir.search} element={<SearchPage />} />
        <Route
          path={appRedir.history}
          element={<HistoryPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.account}
          element={<AccountPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.listing}
          element={<ListingPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.photo}
          element={<PhotoPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route path='/*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
