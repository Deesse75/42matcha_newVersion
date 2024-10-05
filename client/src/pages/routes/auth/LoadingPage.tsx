import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';
import { getCountry } from '../../../utils/functions/geolocation';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../../../utils/context/memory.context';
import { appRedir, authRoute } from '../../../utils/config/appPath';

type Props = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const LoadingPage: FC<Props> = ({
  setMenuIsOpen,
  setDisplayIconMenu,
  setSystemNotif,
}) => {
  const [controlPage, setControlPage] = useState<boolean>(false);
  const memo = useMemory();
  const nav = useNavigate();

  useEffect(() => {
    setMenuIsOpen(false);
    setDisplayIconMenu(false);
    if (!Cookies.get('Geoloc')) getCountry();
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.init);
        const data = await response.json();
        if (!isMounted) return;
        
        if (response.status !== 200) {
          setSystemNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        
        //If server up set cookie
        Cookies.set(
          'matchaOn',
          'a90ea0c9c22cb0c8f8645fe01ff458fdc9ae48a71ae5a461a0f8ea0ab57a3745',
          {
            expires: undefined,
            sameSite: 'None',
            secure: true,
          },
        );
        
        memo.closeAllSubPage();
        memo.setSubPageName('signin');
        nav(appRedir.auth);
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
  }, [controlPage]);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default LoadingPage;
