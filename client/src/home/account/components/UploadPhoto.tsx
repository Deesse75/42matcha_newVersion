import { FC, useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../../appConfig/appPath';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  index: number;
  setReloadProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadPhoto: FC<Props> = ({ setMatchaNotif, index, setReloadProfile }) => {
  const nav = useNavigate();
  const [view, setView] = useState<string>('');
  const [reqData, setReqData] = useState<{
    index: number;
    photo: string;
  } | null>(null);

  const handleCrop = (view: any) => {
    setView(view);
  };

  const handleClose = () => {
    setReqData({ index: index, photo: view });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updatePhoto, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(reqData),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setReqData(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setReloadProfile(true);
      } catch (error) {
        if (!isMounted) return;
        setMatchaNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [reqData]);

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
