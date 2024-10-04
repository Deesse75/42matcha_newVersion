import { FC } from 'react';

type Props = {
  selectedPage: string | null;
  setSelectedPage: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthRedirect: FC<Props> = ({ selectedPage, setSelectedPage }) => {
  return (
    <>
      <div className='auth_redirect_container'>
        {selectedPage === 'signin' && (
          <>
            <div className='auth_redirect_part'>
              <button
                onClick={() => {
                  setSelectedPage('signup');
                }}
              >
                Vous n'avez pas encore de compte
              </button>
              <button
                onClick={() => {
                  setSelectedPage('resendLinkEmail');
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
                onClick={() => {
                  setSelectedPage('forgotPassword');
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
                  setSelectedPage('signin');
                }}
              >
                Vous avez déjà un compte
              </button>
              <button
                onClick={() => {
                  setSelectedPage('resendLinkEmail');
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
                onClick={() => {
                  setSelectedPage('forgotPassword');
                }}
              >
                Vous avez oublié votre mot de passe
              </button>
            </div>
          </>
        )}
        {selectedPage === 'resendLinkEmail' && (
          <>
            <div className='auth_redirect_part'>
              <button
                onClick={() => {
                  setSelectedPage('signin');
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
                  setSelectedPage('signin');
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
