import { FC, useEffect, useState } from 'react';
import AuthRedirect from '../components/AuthRedirect';
import AuthForgotForm from './AuthForgotForm';
import AuthReinitForm from './AuthReinitForm';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ForgotPassword: FC<Props> = ({ setMatchaNotif }) => {
  const [code, setCode] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (Cookies.get('session')) {
      nav(appRedir.getMe);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
  }, []);

  useEffect(() => {
    if (email) setCode(true);
    else setCode(false);
  }, [email]);

  return (
    <>
      <div className='auth_container'>
        <div className='auth_title'>Réinitialisation du mot de passe</div>
        {code ? (
          <>
            <AuthReinitForm
              setMatchaNotif={setMatchaNotif}
              email={email}
              setEmail={setEmail}
            />
          </>
        ) : (
          <>
            <AuthForgotForm
              setMatchaNotif={setMatchaNotif}
              setEmail={setEmail}
            />
          </>
        )}
        <AuthRedirect selectedPage='forgotPassword' />
      </div>
    </>
  );
};

export default ForgotPassword;
