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
import ContactUs from './footer/components/ContactUs';
import HistoryPage from './0aSupprimer/home/listing/ListingPage';
import Signout from './home/Signout';
import AccountPage from './home/account/AccountPage';
import DeleteAccount from './home/account/DeleteAccount';
import Dashboard from './home/Dashboard/Dashboard';
import ChatPage from './home/chat/ChatPage';
import SearchPage from './home/search/SearchPage';

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

        <Route
          path={appRedir.contact}
          element={<ContactUs setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.getMe}
          element={<GetMe setMatchaNotif={setMatchaNotif} />}
        />
        <Route path={appRedir.signout} element={<Signout />} />
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
          path={appRedir.account}
          element={<AccountPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route path='/*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
