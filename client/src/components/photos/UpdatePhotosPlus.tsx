import { FC } from 'react';
import UpdateOnePhotoPlus from './UpdateOnePhotoPlus';

type Props = {
  setUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePlus: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const UpdatePhotosPlus: FC<Props> = ({
  setUpload,
  setDeletePlus,
  setIndex,
}) => {
  return (
    <>
      <div className='photo_plus_container'>
        <div className='photo_plus_container_section'>
          <UpdateOnePhotoPlus
            setUpload={setUpload}
            setDeletePlus={setDeletePlus}
            setIndex={setIndex}
            indexOne={2}
          />
          <UpdateOnePhotoPlus
            setUpload={setUpload}
            setDeletePlus={setDeletePlus}
            setIndex={setIndex}
            indexOne={3}
          />
        </div>
        <div className='photo_plus_container_section'>
          <UpdateOnePhotoPlus
            setUpload={setUpload}
            setDeletePlus={setDeletePlus}
            setIndex={setIndex}
            indexOne={4}
          />
          <UpdateOnePhotoPlus
            setUpload={setUpload}
            setDeletePlus={setDeletePlus}
            setIndex={setIndex}
            indexOne={5}
          />
        </div>
      </div>
    </>
  );
};

export default UpdatePhotosPlus;
