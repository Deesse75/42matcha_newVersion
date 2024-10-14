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
        {selectedPage === 'signin' && (
          <>
            <div className='auth_redirect_part'>
              <button
                onClick={() => {
                  nav(appRedir.signup);
                }}
              >
                Vous n'avez pas encore de compte
              </button>
              <button
                onClick={() => {
                  nav(appRedir.resend);
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
                onClick={() => {
                  nav(appRedir.forgotPassword);
                }}
              >
                Vous avez oublié votre mot de passe
              </button>
            </div>
          </>
        )}
        {selectedPage === 'signup' && (
          <>
            <div className='auth_redirect_part'>
              <button
                onClick={() => {
                  nav(appRedir.signin);
                }}
              >
                Vous avez déjà un compte
              </button>
              <button
                onClick={() => {
                  nav(appRedir.resend);
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
                onClick={() => {
                  nav(appRedir.forgotPassword);
                }}
              >
                Vous avez oublié votre mot de passe
              </button>
            </div>
          </>
        )}
        {selectedPage === 'resend' && (
          <>
            <div className='auth_redirect_part'>
              <button
                onClick={() => {
                  nav(appRedir.signin);
                }}
              >
                Retour à la page de connexion
              </button>
            </div>
          </>
        )}
        {selectedPage === 'forgotPassword' && (
          <>
            <div className='auth_redirect_part'>
              <button
                onClick={() => {
                  nav(appRedir.signin);
                }}
              >
                Retour à la page de connexion
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AuthRedirect;
