import { FC, useEffect, useState } from 'react';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../appContext/user.context';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

export const DeleletPhotoProfile: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const menu = useSelectMenu();
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

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
    if (!deletePhoto) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.deletePhotoProfile, {
          method: 'DELETE',
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
        setDeletePhoto(false);
        setReload(true);
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
  }, [deletePhoto]);

  useEffect(() => {
    if (!reload) return;
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
        setReload(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUser(data.user);
        nav(appRedir.account);
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
  }, [reload]);

  return (
    <>
      <div className='delete_photo_profile_confirm'>
        <div className='delete_photo_profile_confirm_section'>
          {deletePhoto ? (
            <>
              <div className='delete_photo_profile_text_off'>
                Suppression en cours...
              </div>
            </>
          ) : (
            <>
              <div className='delete_photo_profile_text_on'>
                Confirmer la suppression
              </div>
              <div className='delete_photo_profile_button'>
                <button
                  onClick={() => {
                    setDeletePhoto(true);
                  }}
                >
                  Oui
                </button>
                <button
                  onClick={() => {
                    nav(appRedir.account);
                  }}
                >
                  Non
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleletPhotoProfile;
