import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import Cookies from 'js-cookie';
import PageChargement from '../utils/chargement/PageChargement';
import SigninEmailForm from '../components/auth/SigninEmailForm';
import SigninUsernameForm from '../components/auth/SigninUsernameForm';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signin: FC<Props> = ({ setMatchaNotif }) => {
  const [openUsername, setOpenUsername] = useState<boolean>(true);
  const [controlPage, setControlPage] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    if (Cookies.get('session')) {
      nav(appRedir.getMe);
      return;
    }
    setControlPage(true);
  }, []);

  return (
    <>
      {controlPage ? (
        <>
          <div className='auth_page'>
            <div className='auth_page_container'>
              <div className='auth_page_title'>Connexion</div>
              <div className='auth_page_signin_connect'>
                <button
                  onClick={() => {
                    setOpenUsername(!openUsername);
                  }}
                  className='auth_page_signin_connect_button'
                >
                  {openUsername
                    ? "Se connecter avec l'adresse email"
                    : "Se connecter avec le nom d'utilisateur"}
                </button>
              </div>
              <div className='auth_page_form_container'>
                {openUsername ? (
                  <SigninUsernameForm setMatchaNotif={setMatchaNotif} />
                ) : (
                  <SigninEmailForm setMatchaNotif={setMatchaNotif} />
                )}
              </div>
              <div className='auth_page_redirect'>
                <button
                  className='auth_page_redirect_button'
                  onClick={() => {
                    nav(appRedir.signup);
                  }}
                >
                  S'inscrire
                </button>
                <button
                  className='auth_page_redirect_button'
                  onClick={() => {
                    nav(appRedir.resend);
                  }}
                >
                  Valider une adresse email
                </button>
                <button
                  className='auth_page_redirect_button'
                  onClick={() => {
                    nav(appRedir.forgotPassword);
                  }}
                >
                  Mot de passe oublié
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PageChargement />
        </>
      )}
    </>
  );
};

export default Signin;
