import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaitChargement from '../../utils/WaitChargement';
import SigninUsernameForm from '../formulaires/SigninUsernameForm';
import SigninEmailForm from '../formulaires/SigninEmailForm';
import { appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signin: FC<Props> = ({ setMatchaNotif }) => {
  const [openUsername, setOpenUsername] = useState<boolean>(true);
  const [controlPage, setControlPage] = useState<boolean>(false);
  const nav = useNavigate();
  const menu = useSelectMenu();

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    if (Cookies.get('session')) {
      nav(appRedir.getMe);
      return;
    }
    menu.setDisplayAppMenu(false);
    setControlPage(true);
  }, []);

  return (
    <>
      {controlPage ? (
        <>
          <div className='auth_container'>
            <div className='auth_title'>Connexion</div>

            <div className='auth_signin_connect'>
              <button
                onClick={() => {
                  setOpenUsername(!openUsername);
                }}
                className='auth_signin_connect_button'
              >
                {openUsername
                  ? "Se connecter avec l'adresse email"
                  : "Se connecter avec le nom d'utilisateur"}
              </button>
            </div>

            {openUsername ? (
              <SigninUsernameForm setMatchaNotif={setMatchaNotif} />
            ) : (
              <SigninEmailForm setMatchaNotif={setMatchaNotif} />
            )}
            <div className='auth_redirect'>
              <button
                className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.signup);
                }}
              >
                S'inscrire
              </button>
              <button
                className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.resend);
                }}
              >
                Valider une adresse email
              </button>
              <button
                className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.forgotPassword);
                }}
              >
                Mot de passe oublié
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default Signin;
