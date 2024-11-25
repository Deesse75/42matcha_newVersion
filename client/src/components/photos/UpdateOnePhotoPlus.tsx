import { FC, useEffect, useState } from 'react';
import { useUserInfo } from '../../appContext/user.context';
import UploadPhoto from './UploadPhoto';
import { userRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setPhotoPlusLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  source: string | null;
};

const UpdateOnePhotoPlus: FC<Props> = ({
  setMatchaNotif,
  setPhotoPlusLoaded,
  index,
  source,
}) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!newPhoto) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateOnePhotoPlus, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ photo: newPhoto, index: index }),
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
        setPhotoPlusLoaded(true);
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
        const response = await fetch(
          `${userRoute.deleteOnePhotoPlus}/${index}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('session')}`,
            },
          },
        );
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
        setPhotoPlusLoaded(true);
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
      <div className='update_photo_plus_container'>
        <div className='update_photo_plus_display'>
          <img
            className='photo_plus_display_photo'
            src={source ? source : '/avatar/default_avatar.jpg'}
            alt='Photo secondaire'
          />
          <UploadPhoto setNewPhoto={setNewPhoto} w={300} h={350} />
        </div>
        <div className='update_photo_plus_button'>
          {me.user && me.user.photo && (
            <>
              <button
                className='update_photo_plus_button_action'
                onClick={() => {
                  setDeletePhoto(true);
                }}
              >
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateOnePhotoPlus;
