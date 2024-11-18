import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { appRedir, socketRoute, userRoute } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';
import { io, Socket } from 'socket.io-client';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const GetMe: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [userIsLoaded, setUserIsLoaded] = useState<boolean>(false);

  useEffect(() => {
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
        me.setUser(data.user);
        me.setUserTags(data.userTags);
        me.setUserLookFor = data.userLookFor;
        setUserIsLoaded(true);
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
  }, []);

  useEffect(() => {
    if (!userIsLoaded) return;
    if (!me.user) {
      setMatchaNotif('Une erreur est survenue lors de la récupération de vos données.');
      nav(appRedir.signout);
      return;
    }
    if (me.userSocket) return;
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
        setUserIsLoaded(false);
        me.setUserSocket(socket);
        nav(appRedir.account);
        return;
      });

      //If connection is not ok errorPage
      socket.on(socketRoute.connection_failed, () => {
        setMatchaNotif('La connexion a échouée. Veuillez réessayer.');
        socket.disconnect();
        nav(appRedir.errorInternal);
        return;
      });
    };
    request();
  }, [userIsLoaded]);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default GetMe;
