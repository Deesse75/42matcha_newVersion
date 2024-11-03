import { FC, useEffect, useState } from 'react';
import AuthSigninEmailForm from './AuthSigninEmailForm';
import AuthRedirect from '../components/AuthRedirect';
import AuthSigninUsernameForm from './AuthSigninUsernameForm';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signin: FC<Props> = ({ setMatchaNotif }) => {
  const [openUsername, setOpenUsername] = useState<boolean>(true);
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

  return (
    <>
      <div className='auth_container'>
        <div className='auth_title'>Connexion</div>

        <div className='auth_signin_connect_choice'>
          <button
            onClick={() => {
              setOpenUsername(!openUsername);
            }}
            className='auth_signin_connect_choice_button'
          >
            {openUsername
              ? 'Connecte toi avec ton adresse email'
              : "Connecte toi avec ton nom d'utilisateur"}
          </button>
        </div>

        {openUsername ? (
          <AuthSigninUsernameForm setMatchaNotif={setMatchaNotif} />
        ) : (
          <AuthSigninEmailForm setMatchaNotif={setMatchaNotif} />
        )}
        <AuthRedirect selectedPage='signin' />
      </div>
    </>
  );
};

export default Signin;
