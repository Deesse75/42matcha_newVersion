import { FC } from 'react';
import { useUserInfo } from '../../appContext/user.context';

type Props = {
  setUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const UpdatePhotoProfile: FC<Props> = ({
  setUpload,
  setDeleteProfile,
  setIndex,
}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='photo_profile_container'>
        <div className='photo_profile_display'>
          <img
            className='photo_profile_img'
            src={me.user?.photo ?? '/avatar/default_avatar.jpg'}
            alt='Photo de profil'
          />
        </div>
        <div className='photo_button'>
          <button
            className='photo_button_action'
            onClick={() => {
              setUpload(true);
              setIndex(1);
            }}
          >
            {me.user && me.user.photo ? 'Modifier' : 'Ajouter'}
          </button>
          {me.user && me.user.photo && (
            <>
              <button
                className='photo_button_action'
                onClick={() => {
                  setDeleteProfile(true);
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

export default UpdatePhotoProfile;
