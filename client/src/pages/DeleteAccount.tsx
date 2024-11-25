import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { appRedir, userRoute } from '../appConfig/appPath';
import PageChargement from '../utils/chargement/PageChargement';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DeleteAccount: FC<Props> = ({ setMatchaNotif }) => {
  const [action, setAction] = useState(false);
  const [controlPage, setControlPage] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
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
  }, [action, controlPage]);

  return (
    <>
      <div className='delete_account_container'>
        {controlPage ? (
          <>
            {action ? (
              <>
                <div className='wait_to_charge'>Suppression du compte en cours ...</div>
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
                      Annuler
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <PageChargement />
          </>
        )}
      </div>
    </>
  );
};

export default DeleteAccount;
