import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { appRedir, userRoute } from '../../appConfig/appPath';
import ComponentChargement from '../../utils/chargement/ComponentChargement';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DeleteAccount: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);
  const [actionDelete, setActionDelete] = useState<boolean>(false);

  useEffect(() => {
    if (!actionDelete) return;
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
        setActionDelete(false);
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
  }, [actionDelete]);

  return (
    <>
      <div className='delete_account_container'>
        {deleteAccount ? (
          <>
            <div className='delete_account_confirm'>
              {actionDelete ? (
                <>
                  <ComponentChargement />
                </>
              ) : (
                <>
                  <div className='delete_account_confirm_text'>
                    Confirmer la suppression du compte
                  </div>
                  <div className='delete_account_confirm_buttons'>
                    <button
                      className='delete_account_confirm_button'
                      onClick={() => {
                        setActionDelete(true);
                      }}
                    >
                      Oui
                    </button>
                    <button
                      className='delete_account_confirm_button'
                      onClick={() => {
                        setDeleteAccount(false);
                      }}
                    >
                      non
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className='delete_account_submit'>
              <button
                className='delete_account_submit_button'
                onClick={() => {
                  setDeleteAccount(true);
                }}
              >
                Supprimer le compte
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DeleteAccount;
