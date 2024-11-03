import { FC } from 'react';
import { appRedir } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';

type Props = {
  selectedPage: string | null;
};

const AuthRedirect: FC<Props> = ({ selectedPage }) => {
  const nav = useNavigate();

  return (
    <>
      <div className='auth_redirect_container'>
        <div className='auth_redirect_part'>
          {selectedPage === 'signin' && (
            <>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.signup);
                }}
              >
                Vous n'avez pas encore de compte
              </button>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.resend);
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.forgotPassword);
                }}
              >
                Vous avez oublié votre mot de passe
              </button>
            </>
          )}
          {selectedPage === 'signup' && (
            <>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.signin);
                }}
              >
                Vous avez déjà un compte
              </button>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.resend);
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.forgotPassword);
                }}
              >
                Vous avez oublié votre mot de passe
              </button>
            </>
          )}
          {selectedPage === 'resend' && (
            <>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.signin);
                }}
              >
                Retour à la page de connexion
              </button>
            </>
          )}
          {selectedPage === 'forgotPassword' && (
            <>
              <button
              className='auth_redirect_button'
                onClick={() => {
                  nav(appRedir.signin);
                }}
              >
                Retour à la page de connexion
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthRedirect;
