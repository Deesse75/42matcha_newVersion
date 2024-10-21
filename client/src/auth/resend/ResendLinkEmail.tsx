import { FC } from 'react';
import AuthResendForm from './AuthResendForm';
import AuthRedirect from '../components/AuthRedirect';
import AuthTitle from '../components/AuthTitle';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ResendLinkEmail: FC<Props> = ({ setMatchaNotif }) => {
  return (
    <>
      <AuthTitle title='Recevoir un lien de confirmation' />
      <AuthResendForm setMatchaNotif={setMatchaNotif} />
      <AuthRedirect selectedPage='resend' />
    </>
  );
};

export default ResendLinkEmail;
