import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authRoute, appRedir } from '../appConfig/appPath';
import { getLocation } from '../utils/geolocation';
import PageChargement from '../utils/chargement/PageChargement';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const LoadingPage: FC<Props> = ({ setMatchaNotif }) => {
  const [controlPage, setControlPage] = useState<boolean>(false);
  const nav = useNavigate();
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    setSession(Cookies.get('matchaOn') ?? null);
    getLocation();
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
        Cookies.set(
          'matchaOn',
          'a90ea0c9c22cb0c8f8645fe01ff458fdc9ae48a71ae5a461a0f8ea0ab57a3745',
          {
            expires: undefined,
            sameSite: 'None',
            secure: true,
          },
        );

        if (session) nav(appRedir.getMe);
        else nav(appRedir.signin);
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
      <PageChargement />
    </>
  );
};

export default LoadingPage;

