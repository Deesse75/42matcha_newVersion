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
  const [userData, setUserData] = useState<boolean>(false);
  const [reqData, setReqData] = useState<{
    region: string | null;
    county: string | null;
    town: string | null;
  } | null>(null);

  useEffect(() => {
    me.setUser(null);
    setReqData({
      region: localStorage.getItem('region'),
      county: localStorage.getItem('county'),
      town: localStorage.getItem('town'),
    });
  }, []);

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getMe, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(reqData),
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
        setUserData(true);
        setReqData(null);
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
  }, [reqData]);

  useEffect(() => {
    if (!userData) return;
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
        setUserData(false);
        me.setUserSocket(socket);
        nav(appRedir.dashboard);
        return;
      });

      //If connection is not ok errorPage
      socket.on(socketRoute.connectFailed, () => {
        setMatchaNotif('La connexion a échouée. Veuillez réessayer.');
        socket.disconnect();
        nav(appRedir.errorInternal);
        return;
      });
    };
    request();
  }, [userData]);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default GetMe;
