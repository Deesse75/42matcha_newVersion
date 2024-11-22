import { FC, useEffect, useState } from 'react';
import UploadPhoto from './UploadPhoto';
import { BiUpload } from 'react-icons/bi';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../appContext/user.context';
import { MdOutlineDeleteForever } from 'react-icons/md';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdatePhotoProfile: FC<Props> = ({
  setMatchaNotif,
  setReloadAccount,
}) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [upLoad, setUpLoad] = useState<boolean>(false);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  useEffect(() => {
    if (newPhoto && upLoad) {
      setUpLoad(false);
    }
  }, [newPhoto, upLoad]);

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
          <UploadPhoto setNewPhoto={setNewPhoto} setUpLoad={setUpLoad} />
        </>
      ) : (
        <>
          <div className='update_photo_profile_modif'>
            <div
              className='update_photo_profile_modif_icon'
              onClick={() => {
                me?.user?.photo
                  ? nav(appRedir.deletePhotoProfil)
                  : setMatchaNotif("Vous n'avez pas de photo de profil");
                setOpenDelete(false);
              }}
              onMouseOver={() => {
                setOpenDelete(true);
              }}
              onMouseLeave={() => {
                setOpenDelete(false);
              }}
            >
              <MdOutlineDeleteForever
                size={25}
                color={me?.user?.photo ? '#F04358' : '#777777'}
                cursor={me?.user?.photo ? 'pointer' : 'default'}
              />
              {openDelete && (
                <>
                  <div className='update_photo_profile_modif_text'>
                    Supprimer
                  </div>
                </>
              )}
            </div>

            <div
              className='update_photo_profile_modif_icon'
              onClick={() => {
                setUpLoad(true);
                setOpenUpload(false);
              }}
              onMouseOver={() => {
                setOpenUpload(true);
              }}
              onMouseLeave={() => {
                setOpenUpload(false);
              }}
            >
              <BiUpload size={25} color='#07364C' cursor='pointer' />
              {openUpload && (
                <>
                  <div className='update_photo_profile_modif_text'>
                    {me?.user?.photo ? 'Modifier' : 'Ajouter'}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePhotoProfile;
