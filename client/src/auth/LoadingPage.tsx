import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, authRoute } from '../appConfig/appPath';
import { getLocation } from '../utils/geolocation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const LoadingPage: FC<Props> = ({
  setMatchaNotif,
}) => {
  const [init, setInit] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    Cookies.remove('matchaOn');
    getLocation();
    setInit(true);
  }, []);

  useEffect(() => {
    if (!init) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.init);
        const data = await response.json();
        if (!isMounted) return;

        setInit(false);
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

        if (Cookies.get('session')) nav(appRedir.getMe);
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
  }, [init]);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default LoadingPage;
