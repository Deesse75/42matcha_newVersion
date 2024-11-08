import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import Footer from './footer/Footer';
import Header from './header/Header';
import MatchaNotif from './notification/matchaNotification/MatchaNotif';
import { appRedir } from './appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import MenuMatcha from './home/menu/MenuMatcha';
import { useUserInfo } from './appContext/user.context';
import HomeNotification from './notification/homeNotification/HomeNotification';

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
        {!me.user && (
          <>
            <div className='route_bgc'></div>
          </>
        )}
        <div className='route_menu'>
          {me.user && me.userSocket && (
            <>
              <MenuMatcha />
              <HomeNotification />
            </>
          )}
        </div>
        <div className='route_path'>
          <AppRoutes setMatchaNotif={setMatchaNotif} />
        </div>
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
