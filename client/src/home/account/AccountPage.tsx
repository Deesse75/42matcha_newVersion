import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import Cookies from 'js-cookie';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import DisplayPhotoProfile from './components/DisplayPhotoProfile';
import UpdatePhotoProfile from './components/UpdatePhotoProfile';
import UpdateTags from './components/UpdateTags';
import UpdateProfileData from './components/UpdateProfileData';
import UpdateLookFor from './components/UpdateLookFor';
import UpdateUserData from './components/UpdateUserData';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccountPage: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const menu = useSelectMenu();
  const [reloadAccount, setReloadAccount] = useState<string |null>(null);

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
    if (reloadAccount !== 'userData') return;
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
        setReloadAccount(null);
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

  useEffect(() => {
    if (reloadAccount !== 'userTags') return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUserTags, {
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
        setReloadAccount(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUserTags(data.userTags);
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

  useEffect(() => {
    if (reloadAccount !== 'userLookFor') return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUserLookFor, {
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
        setReloadAccount(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUserLookFor(data.userLookFor);
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

  useEffect(() => {
    if (reloadAccount !== 'photosPlus') return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUserPhotosPlus, {
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
        setReloadAccount(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUserPhotosPlus(data.userPhotosPlus);
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
              <UpdateUserData
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
            </div>
            <div className='account_tags'>
              <UpdateTags
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
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
              <UpdateLookFor
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
            </div>
          </div>
        </div>
        <div className='account_top_section'></div>
      </div>
    </>
  );
};

export default AccountPage;
