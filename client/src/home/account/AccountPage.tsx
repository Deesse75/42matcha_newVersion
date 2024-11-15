import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import Cookies from 'js-cookie';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import DisplayPhotoProfile from './components/DisplayPhotoProfile';
import UpdatePhotoProfile from './components/UpdatePhotoProfile';
import UpdateFirstData from './components/UpdateFirstData';
import UpdateTags from './components/UpdateTags';
import UpdateProfileData from './components/UpdateProfileData';
import UpdateLookFor from './components/UpdateLookFor';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccountPage: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const menu = useSelectMenu();
  const [reloadAccount, setReloadAccount] = useState<boolean>(false);

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      menu.setAllMenuOff();
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session') || !me.user) {
      menu.setAllMenuOff();
      nav(appRedir.getMe);
      return;
    }
    menu.setOneMenuOn('account');
  }, []);

  useEffect(() => {
    if (!reloadAccount) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUserData, {
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
        if (data.token) {
          Cookies.set('session', data.token, {
            expires: undefined,
            sameSite: 'None',
            secure: true,
          });
        }
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
        <div className='account_top'>
          <div className='account_top_section'>
            <div className='account_photo'>
              <DisplayPhotoProfile />
              <UpdatePhotoProfile
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
            </div>
            <div className='account_data'>
              <UpdateFirstData
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
            </div>
            <div className='account_tags'>
              <UpdateTags setMatchaNotif={setMatchaNotif} />
            </div>
          </div>
          <div className='account_top_section'>
            <div className='account_profile'>
              <UpdateProfileData
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
            </div>
            <div className='account_lookFor'>
              <UpdateLookFor setMatchaNotif={setMatchaNotif} />
            </div>
          </div>
        </div>
        <div className='account_top_section'></div>
      </div>
    </>
  );
};

export default AccountPage;
