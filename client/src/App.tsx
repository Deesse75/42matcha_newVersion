import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, socketRoute, userRoute } from './appConfig/appPath';
import { useUserInfo } from './appContext/user.context';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';
import Footer from './components/footer/Footer';
import Header from './components/Header';
import MatchaNotif from './components/notification/MatchaNotif';
import MenuMatcha from './components/menu/MenuMatcha';
import SocketNotif from './components/notification/SocketNotif';

function App() {
  const [matchaNotif, setMatchaNotif] = useState<string | null>(null);
  const nav = useNavigate();
  const me = useUserInfo();

  useEffect(() => {
    if (import.meta.hot) {
      if (Cookies.get('session')) nav(appRedir.getMe);
      else nav(appRedir.loading);
    }
  }, [import.meta.hot]);

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
      <div className='matcha_notification'>
        <MatchaNotif
          matchaNotif={matchaNotif}
          setMatchaNotif={setMatchaNotif}
        />
      </div>

      <div className='routes'>
        <div className='routes_header'>
          <Header />
        </div>
        <div className='routes_empty'></div>
        <div className='routes_body'>
          <div className='routes_menu'>
            {me.user && me.user.id && (
              <>
                <MenuMatcha />
              </>
            )}
          </div>
          <div className='routes_path'>
            <AppRoutes setMatchaNotif={setMatchaNotif} />
          </div>
          <div className='routes_socket_notif'>
            <SocketNotif />
          </div>
        </div>
        <div className='routes_footer'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
