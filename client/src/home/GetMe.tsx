import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { appRedir, socketRoute, userRoute } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';
import { io, Socket } from 'socket.io-client';

type Props = {
  setMatchaMenuIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const GetMe: FC<Props> = ({ setMatchaMenuIcon, setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [controlePage, setControlePage] = useState<boolean>(false);
  const [getMeData, setGetMeData] = useState<boolean>(false);

  useEffect(() => {
    setMatchaMenuIcon(false);

    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }

    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
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
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        me.setUser(data.me.user);
        me.setUserLookFor(data.me.userLookFor);
        me.setUserTags(data.me.userTags);
        setControlePage(false);
        setGetMeData(true);
      } catch (error) {
        if (!isMounted) return;
        setMatchaNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [controlePage]);

  useEffect(() => {
    if (!getMeData || me.userSocket) return;
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
        setGetMeData(false);
        return;
      });

      //If connection is not ok errorPage
      socket.on(socketRoute.connectFailed, () => {
        setMatchaNotif('La connexion a échouée. Veuillez réessayer.');
        socket.disconnect();
        setGetMeData(false);
        nav(appRedir.errorInternal);
        return;
      });
    };
    request();
  }, [getMeData]);

  useEffect(() => {
    if (!me.userSocket || !me.user) return;
    if (me.user.birthdate) nav(appRedir.dashboard);
    else nav(appRedir.profile);
  }, [me.userSocket]);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default GetMe;
