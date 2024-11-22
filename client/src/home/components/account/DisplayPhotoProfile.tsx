import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import { appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';

type Props = {};

const DisplayPhotoProfile: FC<Props> = ({}) => {
  const me = useUserInfo();
  const nav = useNavigate();

  return (
    <>
      <img
        className='photo_profile_img'
        src={
          me.user && me.user.photo
            ? me.user.photo
            : '/avatar/default_avatar.jpg'
        }
        alt='Photo de profil'
      />
      <div className='photo_profile_plus'>
        <button
          className='photo_profile_plus_button'
          onClick={() => {
            nav(appRedir.updatePhotosPlus);
          }}
        >
          Afficher les photos secondaires
        </button>
      </div>
    </>
  );
};

export default DisplayPhotoProfile;
