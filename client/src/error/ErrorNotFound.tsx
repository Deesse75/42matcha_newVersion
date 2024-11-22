import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import { useSelectMenu } from '../appContext/selectMenu.context';
import WaitChargement from '../utils/WaitChargement';
import Cookies from 'js-cookie';

type Props = {};

const ErrorNotFound: FC<Props> = ({}) => {
  const nav = useNavigate();
  const menu = useSelectMenu();
  const [session, setSession] = useState<string | null>(null);
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    const session = Cookies.get('session') || null;
    setSession(session);
    menu.setDisplayAppMenu(false);
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
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default ErrorNotFound;
