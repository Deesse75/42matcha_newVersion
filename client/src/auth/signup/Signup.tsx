import { FC, useEffect } from 'react';
import AuthRedirect from '../components/AuthRedirect';
import AuthTitle from '../components/AuthTitle';
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
      <AuthTitle title='Inscription' />
      <AuthSignupForm setMatchaNotif={setMatchaNotif} />
      <AuthRedirect selectedPage='signup' />
    </>
  );
};

export default Signup;
