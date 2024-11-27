import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { appRedir, userRoute } from '../appConfig/appPath';
import { useUserInfo } from '../appContext/user.context';
import DisplayInfoAccount from '../components/account/DisplayInfoAccount';
import DisplayPhotoProfile from '../components/account/DisplayPhotoProfile';
import UpdateBio from '../components/account/UpdateBio';
import UpdateProfileData from '../components/account/UpdateProfileData';
import UpdateTags from '../components/account/UpdateTags';
import UpdateUserData from '../components/account/UpdateUserData';
import PageChargement from '../utils/chargement/PageChargement';
import DeleteAccount from '../components/account/DeleteAccount';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccountPage: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
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
    setControlPage(true);
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

  return (
    <>
      {controlPage ? (
        <>
          <div className='account_container'>
            <div className='account_info'>
              <DisplayInfoAccount />
            </div>
            <div className='account_top'>
              <div className='account_photo'>
                <DisplayPhotoProfile />
              </div>
              <div className='account_data'>
                <UpdateUserData
                  setMatchaNotif={setMatchaNotif}
                  setReloadAccount={setReloadAccount}
                />
              </div>
            </div>
            <div className='account_middle'>
              <div className='account_profile'>
                <UpdateProfileData
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
            <div className='account_bottom'>
              <UpdateBio
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
              <DeleteAccount setMatchaNotif={setMatchaNotif} />
            </div>
          </div>
        </>
      ) : (
        <>
          <PageChargement />
        </>
      )}
    </>
  );
};

export default AccountPage;
