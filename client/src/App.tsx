import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, socketRoute, userRoute } from './appConfig/appPath';
import { useSelectMenu } from './appContext/selectMenu.context';
import { useUserInfo } from './appContext/user.context';
import AppRoutes from './AppRoutes';
import Footer from './footer/Footer';
import Header from './header/Header';
import MenuMatcha from './home/components/menu/MenuMatcha';
import MatchaNotif from './notification/matchaNotification/MatchaNotif';
import SocketNotification from './notification/socketNotification/SocketNotification';
import Cookies from 'js-cookie';

function App() {
  const [matchaNotif, setMatchaNotif] = useState<string | null>(null);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const nav = useNavigate();
  const me = useUserInfo();
  const menu = useSelectMenu();

  useEffect(() => {
    if (import.meta.hot) {
      if (Cookies.get('session')) nav(appRedir.getMe);
      else nav(appRedir.loading);
    }
  }, []);

  useEffect(() => {
    if (menu.displayAppMenu) setDisplayMenu(true);
    else {
      menu.setAllMenuOff();
      setDisplayMenu(false);
    }
  }, [menu.displayAppMenu]);

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

      <div className='socket_notification'>
        <SocketNotification />
      </div>

      <div className='routes'>
        <div className='route_menu'>
          {displayMenu && (
            <>
              <MenuMatcha />
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
