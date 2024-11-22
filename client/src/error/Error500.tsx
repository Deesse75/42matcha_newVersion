import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';
import { useSelectMenu } from '../appContext/selectMenu.context';
import WaitChargement from '../utils/WaitChargement';
import Cookies from 'js-cookie';

type Props = {};

const Error500: FC<Props> = ({}) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const menu = useSelectMenu();
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    Cookies.remove('session');
    me.deleteUserData();
    menu.setDisplayAppMenu(false);
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
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default Error500;
