import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, authRoute } from '../appConfig/appPath';

type Props = {
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaMenuIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const LoadingPage: FC<Props> = ({
  setMatchaMenuOpen,
  setMatchaMenuIcon,
  setMatchaNotif,
}) => {
  const [controlPage, setControlPage] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    setMatchaMenuOpen(false);
    setMatchaMenuIcon(false);
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
          setMatchaNotif(data.message);
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

        nav(appRedir.signin);
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
  }, [controlPage]);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default LoadingPage;
