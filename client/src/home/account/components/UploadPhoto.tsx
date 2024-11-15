import { FC, useState } from 'react';
import Avatar from 'react-avatar-edit';

type Props = {
  setNewPhoto: React.Dispatch<React.SetStateAction<string | null>>;
};

const UploadPhoto: FC<Props> = ({ setNewPhoto }) => {
  const [view, setView] = useState<string>('');

  const handleCrop = (view: any) => {
    setView(view);
  };

  const handleClose = () => {
    setNewPhoto(view);
  };

  return (
    <>
      <div className='avatar'>
        <Avatar
          width={335}
          height={335}
          label='Modifier'
          mimeTypes='image/jpeg, image/png'
          cropRadius={0}
          exportAsSquare={true}
          borderStyle={{ borderRadius: '20px' }}
          labelStyle={{
            fontSize: '20px',
            cursor: 'pointer',
            margin: '150px',
            color: 'white',
            backgroundColor: '#08b895',
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
