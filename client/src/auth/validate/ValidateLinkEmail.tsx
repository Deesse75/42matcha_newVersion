import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ValidateLinkEmail: FC<Props> = ({
  setMatchaNotif,
}) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [url, setUrl] = useState<string | null>(null);
  const [failedReq, setFailedReq] = useState<boolean>(false);

  useEffect(() => {
    Cookies.remove('matchaOn');
    Cookies.remove('session');
    me.deleteUserData();
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.ValidateLinkEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url }),
        });
        const data = await response.json();
        if (!isMounted) return;

        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }

        setUrl(null);
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          setFailedReq(true);
          return;
        }
        nav(appRedir.loading);
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
  }, [url]);

  return (
    <>
      <div className='wait_to_charge'>
        {failedReq
          ? 'Vous Pouvez fermer cete page...'
          : 'Chargement en cours ...'}
      </div>
    </>
  );
};

export default ValidateLinkEmail;
