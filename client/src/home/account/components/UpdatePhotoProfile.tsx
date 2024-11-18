import { FC, useEffect, useState } from 'react';
import UploadPhoto from './UploadPhoto';
import { BiUpload } from 'react-icons/bi';
import { DeleletPhotoProfile } from './DeleletPhotoProfile';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdatePhotoProfile: FC<Props> = ({
  setMatchaNotif,
  setReloadAccount,
}) => {
  const nav = useNavigate();
  const [upLoad, setUpLoad] = useState<boolean>(false);
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
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setNewPhoto(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setReloadAccount('userData');
        setUpLoad(false);
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

  return (
    <>
      {upLoad ? (
        <>
          <UploadPhoto setNewPhoto={setNewPhoto} />
        </>
      ) : (
        <>
          <div className='update_photo_profile_modif'>
            <div
              className='update_photo_profile_modif_upload'
              onClick={() => {
                setUpLoad(true);
              }}
            >
              <BiUpload />
            </div>
            <div
              className='update_photo_profile_modif_delete'
              onClick={() => {
                setUpLoad(true);
              }}
            >
              <DeleletPhotoProfile
                setMatchaNotif={setMatchaNotif}
                setReloadAccount={setReloadAccount}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePhotoProfile;
