import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import Cookies from 'js-cookie';
import PageChargement from '../utils/chargement/PageChargement';

type Props = {};

const ErrorNotFound: FC<Props> = ({}) => {
  const nav = useNavigate();
  const [session, setSession] = useState<string | null>(null);
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    const session = Cookies.get('session') || null;
    setSession(session);
    setControlPage(true);
  }, []);

  return (
    <>
      {controlPage ? (
        <>
          <div className='error_container'>
            <div className='error_title'>ERROR - PAGE INTROUVABLE</div>
            <p className='error_text'>
              La page que vous tentez d'ouvrir est indisponible ou n'existe pas.
            </p>
            <div className='error_button_container'>
              <div
                onClick={() => {
                  if (session) nav(appRedir.getMe);
                  else nav(appRedir.signin);
                }}
                className='error_button'
              >
                Retour à la page d'accueil
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

export default ErrorNotFound;
