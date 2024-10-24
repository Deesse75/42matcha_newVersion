import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import Cookies from 'js-cookie';
import EmailUp from './components/EmailUp';
import FirstnameUp from './components/FirstnameUp';
import LastnameUp from './components/LastnameUp';
import PasswordUp from './components/PasswordUp';
import UsernameUp from './components/UsernameUp';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccountPage: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [reloadAccount, setReloadAccount] = useState<boolean>(false);

  useEffect(() => {
    if (!reloadAccount) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUser, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setReloadAccount(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUser(data.user);
      } catch (error) {
        if (!isMounted) return;
        setMatchaNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [reloadAccount]);

  return (
    <>
      <div className='account_container'>
        <div className='account_title'>Modifier vos données personnelles</div>
        <div className='account_data'>
          <FirstnameUp
            setMatchaNotif={setMatchaNotif}
            setReloadAccount={setReloadAccount}
          />
          <LastnameUp
            setMatchaNotif={setMatchaNotif}
            setReloadAccount={setReloadAccount}
          />
          <UsernameUp
            setMatchaNotif={setMatchaNotif}
            setReloadAccount={setReloadAccount}
          />
          <EmailUp
            setMatchaNotif={setMatchaNotif}
            setReloadAccount={setReloadAccount}
          />
          <PasswordUp
            setMatchaNotif={setMatchaNotif}
            setReloadAccount={setReloadAccount}
          />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
