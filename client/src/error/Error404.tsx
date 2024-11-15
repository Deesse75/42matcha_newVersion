import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import Cookie from 'js-cookie';
import { useSelectMenu } from '../appContext/selectMenu.context';

type Props = {
};

const Error404: FC<Props> = ({ }) => {
  const nav = useNavigate();
  const menu = useSelectMenu();

  useEffect(() => {
    menu.setAllMenuOff();
  }, []);

  return (
    <>
      <div className='error_page'>
        <div className='error_title'>ERROR - PAGE INTROUVABLE</div>
        <p className='error_text'>
          La page que vous tentez d'ouvrir est indisponible ou n'existe pas.
        </p>
        <div className='error_button_container'>
          <div
            onClick={() => {
              if (Cookie.get('session'))
              nav(appRedir.getMe);
              else nav(appRedir.loading);
            }}
            className='error_button'
          >
            Retour à la page d'accueil
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
