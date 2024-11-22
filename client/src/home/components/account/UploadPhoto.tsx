import { FC, useState } from 'react';
import Avatar from 'react-avatar-edit';

type Props = {
  setNewPhoto: React.Dispatch<React.SetStateAction<string | null>>;
  setUpLoad: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadPhoto: FC<Props> = ({ setNewPhoto, setUpLoad }) => {
  const [view, setView] = useState<string>('');

  const handleCrop = (view: any) => {
    setView(view);
  };

  const handleClose = () => {
    setNewPhoto(view);
  };

  return (
    <>
      <div className='avatar_container'>
        <div className='avatar_close_container'>
          <div className='avatar_close' onClick={() => setUpLoad(false)}>
            Fermer
          </div>
        </div>
        <Avatar
          width={330}
          height={330}
          label='Parcourir...'
          mimeTypes='image/jpeg, image/png'
          cropRadius={30}
          exportAsSquare={true}
          borderStyle={{ borderRadius: '10px', border: '1px solid gray' }}
          labelStyle={{
            fontSize: '18px',
            cursor: 'pointer',
            margin: 'auto',
            color: 'black',
          }}
          src=''
          onCrop={handleCrop}
          onClose={handleClose}
        />
      </div>
    </>
  );
};

export default UploadPhoto;
