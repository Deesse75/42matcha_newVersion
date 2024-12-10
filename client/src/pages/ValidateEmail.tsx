import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../appConfig/appPath';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ValidateEmail: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [url, setUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    if (controlPage) return;
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
      <div className='auth_page'>
        <div className='auth_page_container'>
          {message ? (
            <>
              <div className='auth_page_loading_text'>{message}</div>
              <div className='auth_page_loading_text'>
                Vous pouvez fermer cette page
              </div>
            </>
          ) : (
            <>
              <div className='auth_page_title'>
                Validation de l'adresse email en cours ...
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ValidateEmail;
