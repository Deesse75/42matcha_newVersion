import { FC } from 'react';
import AuthResendForm from './AuthResendForm';
import AuthRedirect from '../components/AuthRedirect';
import AuthTitle from '../components/AuthTitle';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ResendLinkEmail: FC<Props> = ({ setSystemNotif }) => {
  return (
    <>
      <AuthTitle title='Recevoir un lien de confirmation' />
      <AuthResendForm setSystemNotif={setSystemNotif} />
      <AuthRedirect selectedPage='resend' />
    </>
  );
};

export default ResendLinkEmail;
