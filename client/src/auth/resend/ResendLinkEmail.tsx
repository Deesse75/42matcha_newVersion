import { FC, useEffect } from 'react';
import AuthResendForm from './AuthResendForm';
import AuthRedirect from '../components/AuthRedirect';
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
      <div className='auth_container'>
        <div className='auth_title'>Recevoir un lien de confirmation</div>
        <AuthResendForm setMatchaNotif={setMatchaNotif} />
        <AuthRedirect selectedPage='resend' />
      </div>
    </>
  );
};

export default ResendLinkEmail;
