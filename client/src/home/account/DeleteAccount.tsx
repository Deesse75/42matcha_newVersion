import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import { useUserInfo } from '../../appContext/user.context';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DeleteAccount: FC<Props> = ({ setMatchaNotif }) => {
  const [action, setAction] = useState(false);
  const nav = useNavigate();
  const menu = useSelectMenu();
  const me = useUserInfo();

  useEffect(() => {
    menu.setAllMenuOff();

    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session') || !me.user) {
      nav(appRedir.getMe);
      return;
    }
  }, []);

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
      <div className='delete_account_container'>
        {action ? (
          <>
            <div className='wait_to_charge'>Chargement en cours ...</div>
          </>
        ) : (
          <>
            <div className='delete_account_confirmation'>
              <div className='delete_account_title'>
                <h1>Veuillez confirmer la suppression du compte</h1>
              </div>
              <div className='delete_account_button'>
                <button
                  onClick={() => {
                    setAction(true);
                  }}
                >
                  Confirmer
                </button>
                <button
                  onClick={() => {
                    nav(appRedir.dashboard);
                  }}
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DeleteAccount;
