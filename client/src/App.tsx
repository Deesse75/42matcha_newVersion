import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import Footer from './footer/Footer';
import Header from './header/Header';
import MatchaNotif from './notification/matchaNotification/MatchaNotif';
import { appRedir } from './appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserInfo } from './appContext/user.context';
import HomeNotification from './notification/homeNotification/HomeNotification';
import MenuMatcha from './home/menu/MenuMatcha';

function App() {
  const [matchaNotif, setMatchaNotif] = useState<string | null>(null);
  const nav = useNavigate();
  const me = useUserInfo();

  useEffect(() => {
    if (import.meta.hot) {
      if (Cookies.get('session')) nav(appRedir.getMe);
      else nav(appRedir.loading);
    }
  }, []);

  return (
    <>
      <div className='header'>
        <Header />
      </div>

      <div className='matcha_notification'>
        <MatchaNotif
          matchaNotif={matchaNotif}
          setMatchaNotif={setMatchaNotif}
        />
      </div>

      <div className='routes'>
        {me.user ? (
          <>
            <div className='route_bgc_user'></div>
          </>
        ) : (
          <>
            <div className='route_bgc_auth'></div>
          </>
        )}
        <div className='route_menu'>
          {me.user && (
            <>
              <MenuMatcha />
            </>
          )}
        </div>
        <div className='route_path'>
          <AppRoutes setMatchaNotif={setMatchaNotif} />
        </div>
        <div className='route_notification'>
          <HomeNotification />
        </div>
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
