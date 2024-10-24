import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir, userRoute } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import UploadPhoto from './components/UploadPhoto';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const PhotoPage: FC<Props> = ({ setMatchaNotif, setReloadProfile }) => {
  const [index, setIndex] = useState<number>(0);
  const nav = useNavigate();
  const me = useUserInfo();
  const [update, setUpdate] = useState<boolean>(false);
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [choice, setChoice] = useState<boolean>(false);
  const [fullPhoto, setFullPhoto] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (!me.user) return;
    setFullPhoto([
      me.user.photo1 ? true : false,
      me.user.photo2 ? true : false,
      me.user.photo3 ? true : false,
      me.user.photo4 ? true : false,
      me.user.photo5 ? true : false,
    ]);
  }, []);

  const handleClick = (index: number) => {
    setIndex(index);
    if (!fullPhoto[index - 1]) {
      setUpdate(true);
    } else setChoice(true);
  };

  useEffect(() => {
    if (!deletePhoto) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.deletePhoto, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ index: index }),
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
        setIndex(0);
        setChoice(false);
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
  }, [deletePhoto]);

  return (
    <>
      <div className='all_photos_container'>
        <div className='all_photos_part'>
          {update ? (
            <>
              {choice ? (
                <>
                  <div className='photo_choice_button'>
                    <input
                      onClick={() => {
                        setUpdate(true);
                      }}
                      type='button'
                      name=''
                      id=''
                      value='Ajouter/Modifier'
                    />
                    <input
                      onClick={() => {
                        setDeletePhoto(true);
                      }}
                      type='button'
                      name=''
                      id=''
                      value='Supprimer'
                    />
                    <input
                      onClick={() => {
                        setChoice(false);
                      }}
                      type='button'
                      name=''
                      id=''
                      value='Annuler'
                    />
                  </div>
                </>
              ) : (
                <>
                  <UploadPhoto
                    setMatchaNotif={setMatchaNotif}
                    index={index}
                    setReloadProfile={setReloadProfile}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <div className='photo_section_title'>
                <div className='photo_section_title_name'>Photo de profil</div>
                <div className='photo_section_title_name'>Photo 2</div>
                <div className='photo_section_title_name'>Photo 3</div>
                <div className='photo_section_title_name'>Photo 4</div>
                <div className='photo_section_title_name'>Photo 5</div>
              </div>
              <div className='photo_section'>
                <img
                  onClick={() => {
                    handleClick(1);
                  }}
                  className='photo_img'
                  src={
                    me.user?.photo1
                      ? me.user.photo1
                      : './avatar/default_avatar.jpg'
                  }
                />
                <img
                  onClick={() => {
                    fullPhoto[1]
                      ? handleClick(2)
                      : setMatchaNotif(
                          'Veuillez remplir les emplacements précédents avant celui-ci.',
                        );
                  }}
                  className='photo_img'
                  src={
                    me.user?.photo2
                      ? me.user.photo2
                      : './avatar/default_avatar.jpg'
                  }
                />
                <img
                  onClick={() => {
                    fullPhoto[2]
                      ? handleClick(3)
                      : setMatchaNotif(
                          'Veuillez remplir les emplacements précédents avant celui-ci.',
                        );
                  }}
                  className='photo_img'
                  src={
                    me.user?.photo3
                      ? me.user.photo3
                      : './avatar/default_avatar.jpg'
                  }
                />
                <img
                  onClick={() => {
                    fullPhoto[3]
                      ? handleClick(4)
                      : setMatchaNotif(
                          'Veuillez remplir les emplacements précédents avant celui-ci.',
                        );
                  }}
                  className='photo_img'
                  src={
                    me.user?.photo4
                      ? me.user.photo4
                      : './avatar/default_avatar.jpg'
                  }
                />
                <img
                  onClick={() => {
                    fullPhoto[4]
                      ? handleClick(5)
                      : setMatchaNotif(
                          'Veuillez remplir les emplacements précédents avant celui-ci.',
                        );
                  }}
                  className='photo_img'
                  src={
                    me.user?.photo5
                      ? me.user.photo5
                      : './avatar/default_avatar.jpg'
                  }
                />
              </div>
              <div className='photo_section_text'>
                Appuyer sur un cadre pour ajouter, modifier ou supprimer une
                photo
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PhotoPage;
