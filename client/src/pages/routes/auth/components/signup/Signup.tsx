import { FC } from 'react';
import AuthRedirect from '../AuthRedirect';
import AuthTitle from '../AuthTitle';
import AuthSignupForm from './AuthSignupForm';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPage: string | null;
};

const Signup: FC<Props> = ({
  selectedPage,
  setSystemNotif,
}) => {
  return (
    <>
      <AuthTitle title='Inscription' />
      <AuthSignupForm
        setSystemNotif={setSystemNotif}
      />
      <AuthRedirect
        selectedPage={selectedPage}
      />
    </>
  );
};

export default Signup;
