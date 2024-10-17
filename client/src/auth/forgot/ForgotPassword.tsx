import { FC, useEffect, useState } from 'react';
import AuthRedirect from '../components/AuthRedirect';
import AuthTitle from '../components/AuthTitle';
import AuthForgotForm from './AuthForgotForm';
import AuthReinitForm from './AuthReinitForm';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ForgotPassword: FC<Props> = ({ setMatchaNotif }) => {
  const [code, setCode] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (email) setCode(true);
    else setCode(false);
  }, [email]);

  return (
    <>
      <AuthTitle title='Réinitialisation du mot de passe' />
      {code ? (
        <>
          <AuthReinitForm
            setMatchaNotif={setMatchaNotif}
            email={email}
            setEmail={setEmail}
          />
        </>
      ) : (
        <>
          <AuthForgotForm setMatchaNotif={setMatchaNotif} setEmail={setEmail} />
        </>
      )}
      <AuthRedirect selectedPage='forgotPassword' />
    </>
  );
};

export default ForgotPassword;
