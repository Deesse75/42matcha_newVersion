import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, socketRoute, userRoute } from '../../../appConfig/appPath';
import { useUserInfo } from '../../../appContext/user.context';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ValidateLinkNewEmail: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [url, setUrl] = useState<string | null>(window.location.href);
  const [closePage, setClosePage] = useState<boolean>(false);
  const [sendNotif, setSendNotif] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.validateLinkNewEmail, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setUrl(null);
        setSendNotif(true);
        setMatchaNotif(data.message);
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

  useEffect(() => {
    if (!sendNotif) return;
    const request = async () => {
      if (me.user && me.userSocket) {
        me.userSocket.emit(socketRoute.validEmail);
        setSendNotif(false);
        setClosePage(true);
      }
    };
    request();
  }, [sendNotif]);

  return (
    <>
      {closePage ? (
        <>
          <button
            onClick={() => {
              window.close();
            }}
          >
            Fermer la page
          </button>
        </>
      ) : (
        <>
          <div className='wait_to_charge'>Chargement en cours ...</div>
        </>
      )}
    </>
  );
};

export default ValidateLinkNewEmail;
