import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMemory } from '../../../utils/context/memory.context';
import { useUserInfo } from '../../../utils/context/user.context';
import { appRedir, socketRoute } from '../../../utils/config/appPath';
import DashboardPage from './dashboard/DashboardPage';
import DeleteAccount from './DeleteAccount';
import ProfilePage from './profile/ProfilePage';
import ChatPage from './chat/ChatPage';
import DisplayFullProfilePage from './display/DisplayFullProfilePage';
import NewProfilePage from './profile/NewProfilePage';
import SearchPage from './search/SearchPage';
import HistoryMenu from './historyMenu/HistoryMenu';

type Props = {
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  historyMenuOn: boolean;
  setHistoryMenuOn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home: FC<Props> = ({
  setDisplayIconMenu,
  setMenuIsOpen,
  setSystemNotif,
  historyMenuOn,
  setHistoryMenuOn,
}) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const memo = useMemory();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  useEffect(() => {
    if (!Cookies.get('session') || !Cookies.get('matchaOn')) {
      setSystemNotif('Votre session a expiré, le site a redemarré.');
      nav(appRedir.loading);
      return;
    }
  }, []);

  useEffect(() => {
    if (!memo.subPageName) {
      nav(appRedir.errorNotfound);
      return;
    }
    setSelectedPage(memo.subPageName);
    if (memo.subPageName === 'newProfile') {
      setDisplayIconMenu(false);
      setHistoryMenuOn(false);
    } else {
      setDisplayIconMenu(true);
      setHistoryMenuOn(true);
    }
  }, [memo.subPageName]);

  useEffect(() => {
    const request = () => {
      if (!me.userSocket) return;

      me.userSocket.on(
        socketRoute.newConnection,
        (id: number, username: string) => {
          if (memo.matchList && memo.matchList.length > 0) {
            memo.matchList.forEach((match) => {
              if (match.id === id) {
                setSystemNotif(`${username} vient de se connecter`);
                return;
              }
            });
          }
        },
      );

      me.userSocket.on(socketRoute.receptView, (username: string) => {
        setSystemNotif(`${username} a visité votre profil`);
        memo.setReloadHistoryMenu('reload');
      });

      me.userSocket.on(socketRoute.receptLike, (username: string) => {
        setSystemNotif(`${username} a liké votre profil`);
        memo.setReloadHistoryMenu('reload');
      });

      me.userSocket.on(socketRoute.receptDislike, (username: string) => {
        setSystemNotif(`${username} a supprimé son Like`);
        memo.setReloadHistoryMenu('reload');
      });

      me.userSocket.on(socketRoute.receptBan, () => {
        memo.setReloadHistoryMenu('reload');
      });
    };
    request();
    return () => {
      if (!me.userSocket) return;
      me.userSocket.off(socketRoute.newConnection);
      me.userSocket.off(socketRoute.receptView);
      me.userSocket.off(socketRoute.receptLike);
      me.userSocket.off(socketRoute.receptDislike);
      me.userSocket.off(socketRoute.receptBan);
    };
  }, [me.userSocket]);

  return (
    <>
      <div
        className='home_page'
        onClick={() => {
          setMenuIsOpen(false);
        }}
      >
        <div className='pages'>
          {selectedPage ? (
            <>
              {selectedPage === 'newProfile' && <NewProfilePage />}
              {selectedPage === 'dashboard' && <DashboardPage />}
              {selectedPage === 'profile' && <ProfilePage />}
              {selectedPage === 'search' && <SearchPage />}
              {selectedPage === 'chat' && <ChatPage />}
              {selectedPage === 'displayProfile' && <DisplayFullProfilePage />}
              {selectedPage === 'deletePage' && <DeleteAccount />}
            </>
          ) : (
            <>
              <div className='wait_to_charge'>Chargement en cours ...</div>
            </>
          )}
        </div>
        <div className='history_menu'>
          {historyMenuOn && (
            <>
              <HistoryMenu />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
