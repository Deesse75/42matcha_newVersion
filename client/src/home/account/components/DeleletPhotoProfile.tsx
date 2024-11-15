import { FC, useEffect, useState } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useUserInfo } from '../../../appContext/user.context';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleletPhotoProfile: FC<Props> = ({
  setMatchaNotif,
  setReloadAccount,
}) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

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
        setConfirm(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setReloadAccount(true);
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
      {confirm ? (
        <>
          <div className='delete_photo_profile_confirm'>
            <div className='delete_photo_profile_text'>
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
                  setConfirm(false);
                }}
              >
                Non
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {me.user && me.user.photo && (
            <div
              className='delete_photo_profile_icon'
              onClick={() => {
                setConfirm(true);
              }}
            >
              <MdOutlineDeleteForever />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DeleletPhotoProfile;
