import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';

type Props = {
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaMenuIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ValidateLinkEmail: FC<Props> = ({
  setMatchaMenuOpen,
  setMatchaMenuIcon,
  setMatchaNotif,
}) => {
  const nav = useNavigate();
  const url = window.location.href;
  const [failedReq, setFailedReq] = useState<boolean>(false);

  useEffect(() => {
    setMatchaMenuOpen(false);
    setMatchaMenuIcon(false);
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
