import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, userRoute } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import { useUserInfo } from '../../appContext/user.context';
import WaitChargement from '../../utils/WaitChargement';
import DisplayPhotoProfile from '../components/account/DisplayPhotoProfile';
import UpdateLookFor from '../components/account/UpdateLookFor';
import UpdatePhotoProfile from '../components/account/UpdatePhotoProfile';
import UpdateProfileData from '../components/account/UpdateProfileData';
import UpdateTags from '../components/account/UpdateTags';
import UpdateUserData from '../components/account/UpdateUserData';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccountPage: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const menu = useSelectMenu();
  const [reloadAccount, setReloadAccount] = useState<string | null>(null);
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    menu.setDisplayAppMenu(true);
    menu.setAllMenuOff();
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
    menu.setOneMenuOn('account');
  }, [controlPage]);

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
      {controlPage ? (
        <>
          <div className='account_container'>
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
            <div className='account_bottom_section'>
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
        </>
      ) : (
        <>
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default AccountPage;
