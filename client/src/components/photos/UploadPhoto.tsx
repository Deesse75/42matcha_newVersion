import { FC, useState } from 'react';
import Avatar from 'react-avatar-edit';

type Props = {
  setNewPhoto: React.Dispatch<React.SetStateAction<string | null>>;
  setUpload: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadPhoto: FC<Props> = ({ setNewPhoto, setUpload }) => {
  const [view, setView] = useState<string | null>(null);

  const handleCrop = (view: any) => {
    setView(view);
  };

  const handleClose = () => {
    if (view) setNewPhoto(view);
    setUpload(false);
  };

  return (
    <>
      <div className='avatar_container'>
        <div className='avatar_close'>
          <button
            className='avatar_close_button'
            onClick={() => {
              setUpload(false);
            }}
          >
            Annuler
          </button>
        </div>
        <div className='avatar_component'>
          <Avatar
            width={350}
            height={300}
            label='Telecharger une photo'
            mimeTypes='image/jpeg, image/png'
            cropRadius={30}
            exportAsSquare={true}
            borderStyle={{
              borderRadius: '10px',
              border: '1px dashed gray',
            }}
            labelStyle={{
              width: 'auto',
              height: '20px',
              fontSize: '18px',
              cursor: 'pointer',
              color: 'black',
              backgroundColor: 'white',
            }}
            src=''
            onCrop={handleCrop}
            onClose={handleClose}
          />
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
