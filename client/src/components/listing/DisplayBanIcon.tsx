import { FC, useEffect, useState } from 'react';
import { actionRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../../appContext/memory.context';

type Props = {
  id: number;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayBanIcon: FC<Props> = ({ id, setMatchaNotif }) => {
  const [banned, setBanned] = useState<boolean>(false);
  const nav = useNavigate();
  const memo = useMemory();

  useEffect(() => {
    if (!banned) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${actionRoute.actionBan}/${id}`, {
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
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setBanned(false);
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          return;
        }
        memo.setActiveProfileId(-1);
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
  }, [banned]);
  return (
    <>
      <button
        className='display_ban'
        onClick={() => {
          setBanned(true);
        }}
      >
        Bloquer ce profil
      </button>
    </>
  );
};

export default DisplayBanIcon;
