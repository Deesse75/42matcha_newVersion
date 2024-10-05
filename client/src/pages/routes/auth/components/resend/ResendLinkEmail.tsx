import { FC } from 'react';
import AuthResendForm from './AuthResendForm';
import AuthRedirect from '../AuthRedirect';
import AuthTitle from '../AuthTitle';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPage: string | null;
};

const ResendLinkEmail: FC<Props> = ({
  selectedPage,
  setSystemNotif,
}) => {
  return (
    <>
      <AuthTitle title='Recevoir un lien de confirmation' />
      <AuthResendForm setSystemNotif={setSystemNotif} />
      <AuthRedirect
        selectedPage={selectedPage}
      />
    </>
  );
};

export default ResendLinkEmail;
