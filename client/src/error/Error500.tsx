import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';

type Props = {};

const Error500: FC<Props> = ({}) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    Cookies.remove('matchaOn');
    Cookies.remove('session');
    me.deleteUserData();
    setControlPage(true);
  }, []);

  return (
    <>
      <div className='error_page'>
        <div className='error_title'>ERREUR</div>
        <p className='error_text'>
          Une erreur de chargement de la page ou une indisponibilité temporaire
          du site a été rencontré.
        </p>
        <p className='error_text'>
          Si vous étiez connecté(e), votre seesion a été déconnectée.
        </p>
        <p className='error_text'>
          Veuillez nous excuser pour la gène occasionnée.
        </p>
        <p className='error_text'>
          Si le problème persiste, vous pouvez envoyer un mail à
          l'administrateur.
        </p>
        {controlPage && (
          <>
            <div className='error_button_container'>
              <div
                onClick={() => {
                  nav(appRedir.contact);
                }}
                className='error_button'
              >
                Nous contacter
              </div>
              <div
                onClick={() => {
                  nav(appRedir.signout);
                }}
                className='error_button'
              >
                Retour à l'accueil
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Error500;
