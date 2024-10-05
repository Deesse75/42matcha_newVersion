import { FC, useState } from 'react';
import AuthTitle from '../AuthTitle';
import AuthSigninEmailForm from './AuthSigninEmailForm';
import AuthRedirect from '../AuthRedirect';
import AuthSigninUsernameForm from './AuthSigninUsernameForm';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPage: string | null;
};

const Signin: FC<Props> = ({
  selectedPage,
  setSystemNotif,
}) => {
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
      <AuthRedirect
        selectedPage={selectedPage}
      />
    </>
  );
};

export default Signin;
