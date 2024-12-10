import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir, userRoute } from '../appConfig/appPath';
import PageChargement from '../utils/chargement/PageChargement';
import UpdatePhotosPlus from '../components/photos/UpdatePhotosPlus';
import UpdatePhotoProfile from '../components/photos/UpdatePhotoProfile';
import { useUserInfo } from '../appContext/user.context';
import UploadPhoto from '../components/photos/UploadPhoto';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const PhotoProfile: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [reloadPlus, setReloadPlus] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [deleteProfile, setDeleteProfile] = useState<boolean>(false);
  const [deletePlus, setDeletePlus] = useState<boolean>(false);

  useEffect(() => {
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!reload) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUserData, {
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
        setReload(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUser(data.user);
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
  }, [reload]);

  useEffect(() => {
    if (reloadPlus) return;
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
        setReloadPlus(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUserPhotosPlus(data.userPhotosPlus);
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
  }, [reloadPlus]);

  useEffect(() => {
    if (!newPhoto) return;
    if (index !== 1) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updatePhotoProfile, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ photo: newPhoto }),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }
        setNewPhoto(null);
        setIndex(0);
        if (response.status !== 200) {
          return;
        }
        setReload(true);
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
  }, [newPhoto]);

  useEffect(() => {
    if (!newPhoto) return;
    if (index < 2) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateOnePhotoPlus, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ photo: newPhoto, index: index }),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }
        setNewPhoto(null);
        setIndex(0);
        if (response.status !== 200) {
          return;
        }
        setReloadPlus(true);
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
  }, [newPhoto]);

  useEffect(() => {
    if (!deleteProfile) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.deletePhotoProfile, {
          method: 'DELETE',
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
        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }
        setDeleteProfile(false);
        if (response.status !== 200) {
          return;
        }
        setReload(true);
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
  }, [deleteProfile]);

  useEffect(() => {
    if (!deletePlus) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${userRoute.deleteOnePhotoPlus}/${index}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('session')}`,
            },
          },
        );
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }
        setDeletePlus(false);
        if (response.status !== 200) {
          return;
        }
        setReloadPlus(true);
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
  }, [deletePlus]);

  return (
    <>
      {controlPage ? (
        <>
          <div className='photos_container'>
            <UpdatePhotoProfile
              setUpload={setUpload}
              setDeleteProfile={setDeleteProfile}
              setIndex={setIndex}
            />
            <UpdatePhotosPlus
              setUpload={setUpload}
              setDeletePlus={setDeletePlus}
              setIndex={setIndex}
            />
            {upload && (
              <UploadPhoto setNewPhoto={setNewPhoto} setUpload={setUpload} />
            )}
          </div>
        </>
      ) : (
        <>
          <PageChargement />
        </>
      )}
    </>
  );
};

export default PhotoProfile;
