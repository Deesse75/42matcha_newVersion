import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ValidateEmail: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const menu = useSelectMenu();
  const [url, setUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    if (controlPage || url) return;
    menu.setDisplayAppMenu(false);
    setUrl(window.location.href);
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.validateEmail, {
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
        setMessage(data.message);
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
      <div className='loading_container'>
        {message ? (
          <>
            <div className='loading_message'>{message}</div>
            <div className='loading_text'>Vous pouvez fermer cette page</div>
          </>
        ) : (
          <>
            <div className='loading_wait'>
              Validation de l'adresse email en cours ...
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ValidateEmail;
