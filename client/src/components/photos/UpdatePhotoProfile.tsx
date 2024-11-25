import { FC, useEffect, useState } from 'react';
import { useUserInfo } from '../../appContext/user.context';
import UploadPhoto from './UploadPhoto';
import { userRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdatePhotoProfile: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!newPhoto) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updatePhotoProfile, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ photo: newPhoto }),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }
        setNewPhoto(null);
        if (response.status !== 200) {
          return;
        }
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
  }, [newPhoto]);

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
        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }
        setDeletePhoto(false);
        if (response.status !== 200) {
          return;
        }
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
  }, [deletePhoto]);


  return (
    <>
      <div className='update_photo_profile_container'>
        <div className='update_photo_profile_display'>
          <img
            className='profile_display_photo'
            src={me.user?.photo ?? '/avatar/default_avatar.jpg'}
            alt='Photo de profil'
          />
          <UploadPhoto setNewPhoto={setNewPhoto} w={400} h={450} />
        </div>
        <div className='update_photo_profile_button'>
          {me.user && me.user.photo && (<><button
            className='update_photo_profile_button_action'
            onClick={() => {
              setDeletePhoto(true);
            }}
          >
            Supprimer
          </button></>)}
          
        </div>
      </div>
    </>
  );
};

export default UpdatePhotoProfile;
