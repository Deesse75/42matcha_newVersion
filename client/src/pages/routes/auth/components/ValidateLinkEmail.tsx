import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../../../utils/config/appPath';

type Props = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ValidateLinkEmail: FC<Props> = ({
  setMenuIsOpen,
  setDisplayIconMenu,
  setSystemNotif,
}) => {
  const nav = useNavigate();
  const url = window.location.href;
  const [failedReq, setFailedReq] = useState<boolean>(false);

  useEffect(() => {
    setMenuIsOpen(false);
    setDisplayIconMenu(false);
  }, []);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.ValidateLinkEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({url: url}),
        });
        const data = await response.json();
        if (!isMounted) return;

        if (response.status === 500) {
          setSystemNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }

        setSystemNotif(data.message);
        if (response.status !== 200) {
          setFailedReq(true);
          return;
        }
        nav(appRedir.loading);
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
