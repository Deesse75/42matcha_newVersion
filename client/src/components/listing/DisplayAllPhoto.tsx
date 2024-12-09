import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  profile: ProfileFrontType;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayAllPhotos: FC<Props> = ({ profile, setMatchaNotif }) => {
  const nav = useNavigate();
  const [photos, setPhotos] = useState<Boolean>(false);
  const [displayPhotos, setDisplayPhotos] = useState<boolean>(false);
  const [photoPlus, setPhotoPlus] = useState<{
    photo2: string | null;
    photo3: string | null;
    photo4: string | null;
    photo5: string | null;
  } | null>(null);

  useEffect(() => {
    if (!photos) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${userRoute.getProfilePhotoPlus}/${profile.id}`,
          {
            method: 'GET',
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
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setPhotos(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setPhotoPlus(data.photoPlus);
        setDisplayPhotos(true);
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
  }, [photos]);

  return (
    <>
      <div className='display_photo_plus'>
        <div className='display_photo_plus_close'>
          <div
            className='display_photo_plus_close_button'
            onClick={() => {
              setDisplayPhotos(false);
            }}
          >
            Fermer
          </div>
        </div>
        {displayPhotos ? (
          <>
            <div className='display_photo_plus_container'>
              <div className='display_photo_plus_profile'>
                <img
                  className='account_photo'
                  src={
                    profile.photo
                      ? profile.photo
                      : '/avatar/default_avatar.jpg'
                  }
                  alt='Photo de profil'
                />
              </div>
              <div className='display_photo_plus_others'>
                <div className='display_photo_plus_others_section'>
                  <img
                    className='account_photo'
                    src={
                      photoPlus?.photo2
                        ? photoPlus.photo2
                        : '/avatar/default_avatar.jpg'
                    }
                    alt='Photo de profil'
                  />
                  <img
                    className='account_photo'
                    src={
                      photoPlus?.photo3
                        ? photoPlus.photo3
                        : '/avatar/default_avatar.jpg'
                    }
                    alt='Photo de profil'
                  />
                </div>
                <div className='display_photo_plus_others_section'>
                  <img
                    className='account_photo'
                    src={
                      photoPlus?.photo4
                        ? photoPlus.photo4
                        : '/avatar/default_avatar.jpg'
                    }
                    alt='Photo de profil'
                  />
                  <img
                    className='account_photo'
                    src={
                      photoPlus?.photo5
                        ? photoPlus.photo5
                        : '/avatar/default_avatar.jpg'
                    }
                    alt='Photo de profil'
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className='display_photo_plus_button'
              onClick={() => {
                setPhotos(true);
              }}
            >
              Voir toutes les photos
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayAllPhotos;
