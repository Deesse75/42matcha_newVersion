import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { appRedir } from '../../utils/config/appPath';
import LoadingPage from './auth/LoadingPage';
import Auth from './auth/AuthPage';
import ValidateLinkEmail from './auth/components/ValidateLinkEmail';
import GetMe from './home/GetMe';

type Props = {
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  historyMenuOn: boolean;
  setHistoryMenuOn: React.Dispatch<React.SetStateAction<boolean>>;
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
          path={appRedir.auth}
          element={<Auth setSystemNotif={setSystemNotif} />}
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
          path={appRedir.getMe}
          element={
            <GetMe
              setDisplayIconMenu={setDisplayIconMenu}
              setMenuIsOpen={setMenuIsOpen}
              setSystemNotif={setSystemNotif}
            />
          }
        />
        {/* <Route path={appRedir.signout} element={<Signout />} />
        <Route path={appRedir.validateLinkEmail} element={} />
        <Route path={appRedir.home} element={} />
        <Route path={appRedir.contact} element={} />
        <Route path={appRedir.footer} element={} />
        <Route path={appRedir.errorPage} element={} />
        <Route path='/*' element={} /> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
