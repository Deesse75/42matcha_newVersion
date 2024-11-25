import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PageChargement from '../utils/chargement/PageChargement';
import { appRedir } from '../appConfig/appPath';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ReinitPasswordForm from '../components/auth/ReinitPasswordForm';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ForgotPassword: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [validRequest, setValidRequest] = useState<boolean>(false);

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
              {validRequest ? (
                <>
                  <div className='auth_page_title'>
                    Réinitialisation du mot de passe
                  </div>
                  <div className='auth_page_form_container'>
                    <ReinitPasswordForm
                      setMatchaNotif={setMatchaNotif}
                      setValidRequest={setValidRequest}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='auth_page_title'>Mot de passe oublié</div>
                  <div className='auth_page_form_container'>
                    <ForgotPasswordForm
                      setMatchaNotif={setMatchaNotif}
                      setValidRequest={setValidRequest}
                    />
                  </div>
                </>
              )}
              <div className='auth_page_redirect'>
                <button
                  className='auth_page_redirect_button'
                  onClick={() => {
                    nav(appRedir.signin);
                  }}
                >
                  Se connecter
                </button>
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

export default ForgotPassword;
