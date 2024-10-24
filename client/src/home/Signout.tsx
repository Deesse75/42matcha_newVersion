import { FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';

type Props = {};

const Signout: FC<Props> = ({}) => {
  const me = useUserInfo();
  const nav = useNavigate();

  useEffect(() => {
    Cookies.remove('session');
    me.deleteUserData();
    nav(appRedir.signin);
  }, []);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default Signout;
