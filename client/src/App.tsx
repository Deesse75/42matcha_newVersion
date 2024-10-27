import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import Footer from './footer/Footer';
import Header from './header/Header';
import MatchaNotif from './notification/matchaNotification/MatchaNotif';
import { appRedir } from './appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import MenuMatcha from './home/menu/MenuMatcha';

function App() {
  const [matchaNotif, setMatchaNotif] = useState<string | null>(null);
  const nav = useNavigate();

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

      <div className='system_notification'>
        <MatchaNotif
          matchaNotif={matchaNotif}
          setMatchaNotif={setMatchaNotif}
        />
      </div>

      <div className='routes'>
        <div className='route_menu'>
          <MenuMatcha />
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
