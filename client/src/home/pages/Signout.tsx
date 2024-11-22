import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import WaitChargement from '../../utils/WaitChargement';
import Cookies from 'js-cookie';

type Props = {};

const Signout: FC<Props> = ({}) => {
  const me = useUserInfo();
  const menu = useSelectMenu();
  const nav = useNavigate();
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    Cookies.remove('session');
    menu.setDisplayAppMenu(false);
    menu.setAllMenuOff();
    me.deleteUserData();
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
    setControlPage(false);
    nav(appRedir.loading);
  }, [controlPage]);

  return (
    <>
      <WaitChargement text='Déconnexion en cours ...' />
    </>
  );
};

export default Signout;
