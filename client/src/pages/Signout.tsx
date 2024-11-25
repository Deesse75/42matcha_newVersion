import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { appRedir } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';

type Props = {};

const Signout: FC<Props> = ({}) => {
  const me = useUserInfo();
  const nav = useNavigate();

  useEffect(() => {
    Cookies.remove('session');
    me.deleteUserData();
    nav(appRedir.loading);
  }, []);

  return (
    <>
      <div className="signout">Déconnexion en cours ...</div>
    </>
  );
};

export default Signout;
