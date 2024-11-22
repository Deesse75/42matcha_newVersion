import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../formulaires/SignupForm';
import WaitChargement from '../../utils/WaitChargement';
import { appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signup: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const menu = useSelectMenu();
  const [controlPage, setControlPage] = useState<boolean>(false);

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
            <div className='auth_title'>Inscription</div>
            <SignupForm setMatchaNotif={setMatchaNotif} />
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

export default Signup;
