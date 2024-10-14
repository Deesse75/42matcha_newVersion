import Cookies from 'js-cookie';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';

type Props = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Error404: FC<Props> = ({ setMenuIsOpen }) => {
  const nav = useNavigate();

  useEffect(() => {
    Cookies.remove('matchaOn');
    Cookies.remove('session');
    setMenuIsOpen(false);
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
              nav(appRedir.signout);
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
