import { FC, useState } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import UpdatePhotosPlus from './UpdatePhotosPlus';

type Props = {};

const DisplayPhotoProfile: FC<Props> = ({}) => {
  const me = useUserInfo();
  const [photoPlus, setPhotoPlus] = useState<boolean>(false);

  return (
    <>
      <div className='photo_profil_container'>
        <img
          className='photo_profil_img'
          src={
            me.user && me.user.photo
              ? me.user.photo
              : '/avatar/default_avatar.jpg'
          }
          alt='Photo de profil'
        />
        <div className='photo_profil_plus'>
          {photoPlus ? (
            <>
              <UpdatePhotosPlus id={me.user ? me.user.id : 0} />
            </>
          ) : (
            <>
              <div className='photo_profil_plus_button'>
                <button
                  onClick={() => {
                    setPhotoPlus(true);
                  }}
                >
                  Ajouter/Modifier plus de photos
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayPhotoProfile;
