import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appRedir } from './appConfig/appPath';
import ForgotPassword from './auth/pages/ForgotPassword';
import Loading from './auth/pages/Loading';
import ResendEmail from './auth/pages/ResendEmail';
import Signin from './auth/pages/Signin';
import Signup from './auth/pages/Signup';
import ValidateEmail from './auth/pages/ValidateEmail';
import Error500 from './error/Error500';
import ErrorNotFound from './error/ErrorNotFound';
import ContactUs from './footer/components/ContactUs';
import UpdateEmail from './home/components/account/UpdateEmail';
import UpdatePassword from './home/pages/UpdatePassword';
import UpdatePhotosPlus from './home/components/account/UpdatePhotosPlus';
import AccountPage from './home/pages/Account';
import ChatPage from './home/pages/Chat';
import DeleletPhotoProfile from './home/pages/DeleletPhotoProfile';
import DeleteAccount from './home/pages/DeleteAccount';
import GetMe from './home/pages/GetMe';
import SearchPage from './home/pages/Search';
import Signout from './home/pages/Signout';
import Dashboard from './home/pages/Dashboard';
import History from './home/pages/History';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppRoutes: FC<Props> = ({ setMatchaNotif }) => {
  return (
    <>
      <Routes>
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

        <Route path={appRedir.errorNotfound} element={<ErrorNotFound />} />
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
          path={appRedir.history}
          element={<History setMatchaNotif={setMatchaNotif} />}
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
          path={appRedir.account}
          element={<AccountPage setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.updateEmail}
          element={<UpdateEmail setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.updatePassword}
          element={<UpdatePassword setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.updatePhotosPlus}
          element={<UpdatePhotosPlus setMatchaNotif={setMatchaNotif} />}
        />
        <Route
          path={appRedir.deletePhotoProfil}
          element={<DeleletPhotoProfile setMatchaNotif={setMatchaNotif} />}
        />
        <Route path='/*' element={<ErrorNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
