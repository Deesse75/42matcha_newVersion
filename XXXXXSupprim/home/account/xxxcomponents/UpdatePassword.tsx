import { FC, useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { userRoute, appRedir } from '../../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UpdateNewPassword from './UpdateNewPassword';

type Props = {
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  updatePassword: boolean;
  setUpdatePassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdatePassword: FC<Props> = ({
  setReloadAccount,
  setMatchaNotif,
  updatePassword,
  setUpdatePassword,
}) => {
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!sendEmail) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.sendEmailNewPassword, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (!isMounted) return;
        setMatchaNotif(data.message);
        if (data.message && data.message.split(' ')[0] === 'Token') {
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }
        if (response.status !== 200) {
          return;
        }
        setUpdatePassword(true);
        setSendEmail(false);
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
  }, [sendEmail]);

  return (
    <>
      <div className='account_data_password'>
        {updatePassword ? (
          <>
            <UpdateNewPassword
              setUpdatePassword={setUpdatePassword}
              setReloadAccount={setReloadAccount}
              setMatchaNotif={setMatchaNotif}
            />
          </>
        ) : (
          <>
            {sendEmail ? (
              <>
                <div className='wait_to_charge'>Chargement en cours ...</div>
              </>
            ) : (
              <>
                <div className='account_data_password_update'>
                  <div className='account_data_password_update_text'>
                    Modifier le mot de passe
                  </div>
                  <div
                    className='account_data_password_update_button'
                    onClick={() => {
                      setSendEmail(true);
                    }}
                  >
                    <MdOutlineKeyboardDoubleArrowRight />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UpdatePassword;
