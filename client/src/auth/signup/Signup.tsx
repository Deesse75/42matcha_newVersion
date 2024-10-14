import { FC } from 'react';
import AuthRedirect from '../components/AuthRedirect';
import AuthTitle from '../components/AuthTitle';
import AuthSignupForm from './AuthSignupForm';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signup: FC<Props> = ({ setSystemNotif }) => {
  return (
    <>
      <AuthTitle title='Inscription' />
      <AuthSignupForm setSystemNotif={setSystemNotif} />
      <AuthRedirect selectedPage='signup' />
    </>
  );
};

export default Signup;
