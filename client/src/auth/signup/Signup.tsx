import { FC, useEffect } from 'react';
import AuthRedirect from '../components/AuthRedirect';
import AuthSignupForm from './AuthSignupForm';
import { appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signup: FC<Props> = ({ setMatchaNotif }) => {
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
        <div className='auth_title'>Inscription</div>
        <AuthSignupForm setMatchaNotif={setMatchaNotif} />
        <AuthRedirect selectedPage='signup' />
      </div>
    </>
  );
};

export default Signup;
