import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardDeleteAccount: FC<Props> = ({ setMatchaNotif }) => {
  const [action, setAction] = useState(false);
  const nav = useNavigate();

  const handleClick = (value: string) => {
    if (value === 'yes') setAction(true);
    else nav(appRedir.account);
  };

  useEffect(() => {
    if (!action) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.deleteAccount, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          nav(appRedir.errorInternal);
          return;
        }
        nav(appRedir.signout);
      } catch (error) {
        if (!isMounted) return;
        setMatchaNotif((error as Error).message);
        nav(appRedir.errorInternal);
        return;
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [action]);

  return (
    <>
      <div className='delete_container'>
        {action ? (
          <>
            <div className='wait_to_charge'>Chargement en cours ...</div>
          </>
        ) : (
          <>
            <div className='title'>
              <h1>Suppression du compte</h1>
            </div>
            <div className='delete_button'>
              <button
                onClick={() => {
                  handleClick('yes');
                }}
              >
                Confirmer
              </button>
              <button
                onClick={() => {
                  handleClick('no');
                }}
              >
                Accueil
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardDeleteAccount;
