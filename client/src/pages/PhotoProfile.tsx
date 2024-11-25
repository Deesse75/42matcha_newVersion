import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import PageChargement from '../utils/chargement/PageChargement';
import UpdatePhotosPlus from '../components/photos/UpdatePhotosPlus';
import UpdatePhotoProfile from '../components/photos/UpdatePhotoProfile';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const PhotoProfile: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [photoPlus, setPhotoPlus] = useState<boolean>(false);

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

  return (
    <>
      {controlPage ? (
        <>
          <div className='photos_container'>
            <div className='photos_redirect'>
              <button
                className='photos_redirect_button'
                onClick={() => {
                  setPhotoPlus(!photoPlus);
                }}
              >
                {photoPlus
                  ? 'Modifier la photo de profil'
                  : 'Modifier les photos secondaires'}
              </button>
            </div>
            <div className='photos_update'>
              {photoPlus ? (
                <>
                  <UpdatePhotosPlus setMatchaNotif={setMatchaNotif} />
                </>
              ) : (
                <>
                  <UpdatePhotoProfile
                    setMatchaNotif={setMatchaNotif}
                  />
                </>
              )}
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

export default PhotoProfile;
