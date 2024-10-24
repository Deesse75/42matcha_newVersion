import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import Cookie from 'js-cookie';

type Props = {
};

const Error404: FC<Props> = ({ }) => {
  const nav = useNavigate();

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
            Retourner à l'accueil'
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
