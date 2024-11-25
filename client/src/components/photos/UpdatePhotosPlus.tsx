import { FC, useEffect, useState } from 'react';
import { userRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UpdateOnePhotoPlus from './UpdateOnePhotoPlus';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdatePhotosPlus: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [photoPlusLoaded, setPhotoPlusLoaded] = useState<boolean>(false);
  const [photoPlus, setPhotoPlus] = useState<{
    photo2: string | null;
    photo3: string | null;
    photo4: string | null;
    photo5: string | null;
  } | null>(null);

  useEffect(() => {
    if (photoPlusLoaded) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUserPhotosPlus, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
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
        setPhotoPlusLoaded(true);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setPhotoPlus(data);
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
  }, [photoPlusLoaded]);


  return (
    <>
      <div className='update_photo_plus_container'>
        <UpdateOnePhotoPlus
          setMatchaNotif={setMatchaNotif}
          setPhotoPlusLoaded={setPhotoPlusLoaded}
          index={2}
          source={photoPlus?.photo2 ?? null}
        />
        <UpdateOnePhotoPlus
          setMatchaNotif={setMatchaNotif}
          setPhotoPlusLoaded={setPhotoPlusLoaded}
          index={3}
          source={photoPlus?.photo3 ?? null}
        />
        <UpdateOnePhotoPlus
          setMatchaNotif={setMatchaNotif}
          setPhotoPlusLoaded={setPhotoPlusLoaded}
          index={4}
          source={photoPlus?.photo4 ?? null}
        />
        <UpdateOnePhotoPlus
          setMatchaNotif={setMatchaNotif}
          setPhotoPlusLoaded={setPhotoPlusLoaded}
          index={5}
          source={photoPlus?.photo5 ?? null}
        />
      </div>
    </>
  );
};

export default UpdatePhotosPlus;
