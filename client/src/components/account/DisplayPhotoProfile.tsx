import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../appContext/user.context';
import { appRedir } from '../../appConfig/appPath';

type Props = {};

const DisplayPhotoProfile: FC<Props> = ({}) => {
  const me = useUserInfo();
  const nav = useNavigate();

  return (
    <>
      <div className='account_photo_container'>
        <div className='account_photo_frame'>
          <img
            className='account_photo'
            src={me.user?.photo ?? '/avatar/default_avatar.jpg'}
            alt='Photo de profil'
          />
        </div>
        <div className='account_photo_redirect'>
          <button
            className='account_photo_redirect_button'
            onClick={() => {
              nav(appRedir.updatePhotos);
            }}
          >
            Modifier les photos
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayPhotoProfile;
