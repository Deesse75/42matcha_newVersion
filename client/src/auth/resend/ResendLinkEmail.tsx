import { FC, useEffect } from 'react';
import AuthResendForm from './AuthResendForm';
import AuthRedirect from '../components/AuthRedirect';
import AuthTitle from '../components/AuthTitle';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ResendLinkEmail: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();

  useEffect(() => {
    if (Cookies.get('session')) {
      nav(appRedir.getMe);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
  }, []);

  return (
    <>
      <AuthTitle title='Recevoir un lien de confirmation' />
      <AuthResendForm setMatchaNotif={setMatchaNotif} />
      <AuthRedirect selectedPage='resend' />
    </>
  );
};

export default ResendLinkEmail;
