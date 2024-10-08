import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { appRedir, socketRoute, userRoute } from '../../../utils/config/appPath';
import { useUserInfo } from '../../../utils/context/user.context';
import { io, Socket } from 'socket.io-client';
import { useMemory } from '../../../utils/context/memory.context';

type Props = {
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const GetMe: FC<Props> = ({
  setDisplayIconMenu,
  setMenuIsOpen,
  setSystemNotif,
}) => {
  const me = useUserInfo();
  const memo = useMemory();
  const nav = useNavigate();
  const [controlePage, setControlePage] = useState<boolean>(false);
  const [getMe, setGetMe] = useState<boolean>(false);

  useEffect(() => {
    setMenuIsOpen(false);
    setDisplayIconMenu(false);
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
    setControlePage(true);
  }, []);

  useEffect(() => {
    if (!controlePage) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getMe, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setSystemNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status !== 200) {
          setSystemNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        me.setUser(data.me.user);
        me.setUserTags(data.me.userTags);
        setGetMe(true);
      } catch (error) {
        if (!isMounted) return;
        setSystemNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [controlePage]);

  useEffect(() => {
    if (!getMe) return;
    const request = async () => {
      //Connect to the socket
      const socket: Socket = io(socketRoute.path, {
        reconnection: true,
        query: {
          id: me.user ? me.user.id : 0,
          username: me.user ? me.user.username : '',
        },
      });

      //If connection is ok set userSocket
      socket.on(socketRoute.connected, () => {
        me.setUserSocket(socket);
        return;
      });

      //If connection is not ok errorPage
      socket.on(socketRoute.connectFailed, () => {
        setSystemNotif('La connexion a échouée. Veuillez réessayer.');
        socket.disconnect();
        nav(appRedir.errorInternal);
        return;
      });
    };
    request();
  }, [getMe]);

  useEffect(() => {
    if (!me.userSocket) return;
    if (me.user && me.user.birthdate) memo.setSubPageName('dashboard');
    else memo.setSubPageName('newProfile');
    nav(appRedir.home);
  }, [me.userSocket]);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default GetMe;
