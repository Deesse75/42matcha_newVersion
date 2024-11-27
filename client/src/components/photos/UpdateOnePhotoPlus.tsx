import { FC } from 'react';
import { PhotosPlusFrontType } from '../../appConfig/interface';
import { useUserInfo } from '../../appContext/user.context';

type Props = {
  setUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePlus: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  indexOne: number;
};

const UpdateOnePhotoPlus: FC<Props> = ({
  setUpload,
  setDeletePlus,
  setIndex,
  indexOne,
}) => {
  const me = useUserInfo();
  const Photo = `photo${indexOne}` as keyof PhotosPlusFrontType;

  return (
    <>
      <div key={indexOne} className='one_photo_plus_container'>
        <div className='one_photo_plus_display'>
          <img
            className='one_photo_plus_display_img'
            src={
              me?.userPhotosPlus && me.userPhotosPlus[Photo]
                ? String(me.userPhotosPlus[Photo])
                : '/avatar/default_avatar.jpg'
            }
            alt='Photo secondaire'
          />
        </div>
        <div className='photo_button'>
          <button
            className='photo_button_action'
            onClick={() => {
              setUpload(true);
              setIndex(indexOne);
            }}
          >
            {me?.userPhotosPlus && me.userPhotosPlus[Photo]
              ? 'Modifier'
              : 'Ajouter'}
          </button>
          {me?.userPhotosPlus && me.userPhotosPlus[Photo] && (
            <>
              <button
                className='photo_button_action'
                onClick={() => {
                  setDeletePlus(true);
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
