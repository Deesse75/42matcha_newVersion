import { FC } from 'react';
import AuthRedirect from '../components/AuthRedirect';
import AuthTitle from '../components/AuthTitle';
import AuthSignupForm from './AuthSignupForm';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signup: FC<Props> = ({ setMatchaNotif }) => {
  return (
    <>
      <AuthTitle title='Inscription' />
      <AuthSignupForm setMatchaNotif={setMatchaNotif} />
      <AuthRedirect selectedPage='signup' />
    </>
  );
};

export default Signup;
