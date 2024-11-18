import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import Footer from './footer/Footer';
import Header from './header/Header';
import MatchaNotif from './notification/matchaNotification/MatchaNotif';
import { appRedir, socketRoute, userRoute } from './appConfig/appPath';
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

  useEffect(() => {
    const listenSocket = () => {
      if (!me.userSocket) return;

      me.userSocket.on(socketRoute.updateToken, () => {
        const request = async () => {
          try {
            const response = await fetch(
              `${userRoute.getNewToken}/${me.user?.id}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
            const data = await response.json();
            if (response.status !== 200) {
              setMatchaNotif(data.message);
              nav(appRedir.errorInternal);
              return;
            }
            Cookies.set('session', data.token, {
              expires: undefined,
              sameSite: 'None',
              secure: true,
            });
          } catch (error) {
            setMatchaNotif((error as Error).message);
            nav(appRedir.errorInternal);
          }
        };
        request();
      });

    };
    listenSocket();
    return () => {
      if (!me.userSocket) return;
      me.userSocket.off(socketRoute.updateToken);
    };
  }, [me.userSocket]);

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
