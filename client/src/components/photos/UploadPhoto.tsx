import { FC, useState } from 'react';
import Avatar from 'react-avatar-edit';

type Props = {
  setNewPhoto: React.Dispatch<React.SetStateAction<string | null>>;
  w: number;
  h: number;
};

const UploadPhoto: FC<Props> = ({ setNewPhoto, w, h }) => {
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
        <div className='avatar_close_container'></div>
        <Avatar
          width={w}
          height={h}
          label='Modifier'
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
    </>
  );
};

export default UploadPhoto;
