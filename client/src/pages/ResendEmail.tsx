import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import Cookies from 'js-cookie';
import PageChargement from '../utils/chargement/PageChargement';
import ResendEmailForm from '../components/auth/ResendEmailForm';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ResendEmail: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
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
    setControlPage(true);
  }, []);

  return (
    <>
      {controlPage ? (
        <>
          <div className='auth_page'>
            <div className='auth_page_container'>
              <div className='auth_page_title'>Valider une adresse email</div>
              <div className='auth_page_form_container'>
                <ResendEmailForm setMatchaNotif={setMatchaNotif} />
              </div>
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

export default ResendEmail;
