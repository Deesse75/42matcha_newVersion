import { FC } from 'react';
import { useMemory } from '../../../../utils/context/memory.context';

type Props = {
  selectedPage: string | null;
};

const AuthRedirect: FC<Props> = ({ selectedPage }) => {
  const memo = useMemory();

  return (
    <>
      <div className='auth_redirect_container'>
        {selectedPage === 'signin' && (
          <>
            <div className='auth_redirect_part'>
              <button
                onClick={() => {
                  memo.setSubPageName('signup');
                }}
              >
                Vous n'avez pas encore de compte
              </button>
              <button
                onClick={() => {
                  memo.setSubPageName('resendLinkEmail');
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
                onClick={() => {
                  memo.setSubPageName('forgotPassword');
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
                  memo.setSubPageName('signin');
                }}
              >
                Vous avez déjà un compte
              </button>
              <button
                onClick={() => {
                  memo.setSubPageName('resendLinkEmail');
                }}
              >
                Vous souhaitez valider votre adresse email
              </button>
              <button
                onClick={() => {
                  memo.setSubPageName('forgotPassword');
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
                  memo.setSubPageName('signin');
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
                  memo.setSubPageName('signin');
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
