import { FC, useEffect, useState } from 'react';
import AuthRedirect from '../AuthRedirect';
import AuthTitle from '../AuthTitle';
import AuthForgotForm from './AuthForgotForm';
import AuthReinitForm from './AuthReinitForm';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPage: string | null;
  setSelectedPage: React.Dispatch<React.SetStateAction<string | null>>;
};

const ForgotPassword: FC<Props> = ({
  selectedPage,
  setSelectedPage,
  setSystemNotif,
}) => {
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
            setSystemNotif={setSystemNotif}
            email={email}
            setEmail={setEmail}
          />
        </>
      ) : (
        <>
          <AuthForgotForm
            setSystemNotif={setSystemNotif}
            setEmail={setEmail}
          />
        </>
      )}
      <AuthRedirect
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </>
  );
};

export default ForgotPassword;
