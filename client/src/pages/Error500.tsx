import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';
import Cookies from 'js-cookie';
import PageChargement from '../utils/chargement/PageChargement';

type Props = {};

const Error500: FC<Props> = ({}) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    Cookies.remove('session');
    me.deleteUserData();
    setControlPage(true);
  }, []);

  return (
    <>
      {controlPage ? (
        <>
          <div className='error_container'>
            <div className='error_title'>ERREUR SYSTEME</div>
            <p className='error_text'>
              Le système a rencontré une erreur interne.
            </p>
            <p className='error_text'>La session sera réinitialisée.</p>
            <p className='error_text'>
              Veuillez nous excuser pour la gène occasionnée.
            </p>
            <p className='error_text'>
              Si le problème persiste, vous pouvez envoyer un mail à
              l'administrateur.
            </p>
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
                  nav(appRedir.loading);
                }}
                className='error_button'
              >
                Se connecter
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

export default Error500;
