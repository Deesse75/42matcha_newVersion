import { FC, useState } from 'react';
import AuthTitle from '../components/AuthTitle';
import AuthSigninEmailForm from './AuthSigninEmailForm';
import AuthRedirect from '../components/AuthRedirect';
import AuthSigninUsernameForm from './AuthSigninUsernameForm';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signin: FC<Props> = ({ setSystemNotif }) => {
  const [openUsername, setOpenUsername] = useState<boolean>(true);

  return (
    <>
      <AuthTitle title='Connexion' />

      <button
        onClick={() => {
          setOpenUsername(!openUsername);
        }}
        className='auth_page_signin_username_button'
      >
        {openUsername
          ? "Se connecter avec l'adresse email"
          : "Se connecter avec le nom d'utilisateur"}
      </button>
      {openUsername ? (
        <AuthSigninUsernameForm setSystemNotif={setSystemNotif} />
      ) : (
        <AuthSigninEmailForm setSystemNotif={setSystemNotif} />
      )}
      <AuthRedirect selectedPage='signin' />
    </>
  );
};

export default Signin;
