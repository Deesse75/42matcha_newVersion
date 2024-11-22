import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../formulaires/ForgotPasswordForm';
import WaitChargement from '../../utils/WaitChargement';
import { appRedir } from '../../appConfig/appPath';
import ReinitPasswordForm from '../formulaires/ReinitPasswordForm';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ForgotPassword: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const menu = useSelectMenu();
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
    menu.setDisplayAppMenu(false);
    setControlPage(true);
  }, []);

  return (
    <>
      {controlPage ? (
        <>
          <div className='auth_container'>
            {validRequest ? (
              <>
                <div className='auth_title'>
                  Réinitialisation du mot de passe
                </div>
                <ReinitPasswordForm
                  setMatchaNotif={setMatchaNotif}
                  setValidRequest={setValidRequest}
                />
              </>
            ) : (
              <>
                <div className='auth_title'>Mot de passe oublié</div>
                <ForgotPasswordForm
                  setMatchaNotif={setMatchaNotif}
                  setValidRequest={setValidRequest}
                />
              </>
            )}
            <div className='auth_redirect'>
              <button
                className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.signin);
                }}
              >
                Se connecter
              </button>
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

export default ForgotPassword;
