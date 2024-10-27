import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../appContext/user.context';
import UploadPhoto from './components/UploadPhoto';
import DeletePhotos from './components/DeletePhotos';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const PhotoPage: FC<Props> = ({ setMatchaNotif }) => {
  const [index, setIndex] = useState<number>(0);
  const nav = useNavigate();
  const me = useUserInfo();
  const [relaodPhotos, setReloadPhotos] = useState<boolean>(false);
  const [actionSelected, setActionSelected] = useState<string | null>(null);
  const [action, setAction] = useState<boolean>(false);

  const handleClick = (index: number) => {};

  return (
    <>
      <div className='photos_Page_container'>
        <div className='photos_Page_section'>
          {actionSelected === 'showPhoto' && (
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
                    setIndex(1);
                    setAction(true);
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
                    setIndex(2);
                    setAction(true);
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
                    setIndex(3);
                    setAction(true);
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
                    setIndex(4);
                    setAction(true);
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
                    setIndex(5);
                    setAction(true);
                  }}
                  className='photo_img'
                  src={
                    me.user?.photo5
                      ? me.user.photo5
                      : './avatar/default_avatar.jpg'
                  }
                />
                {action && (<>
                <div onClick={() => {setActionSelected('upload'); setAction(false);}} className="photo_section_action">Ajouter/Modifier</div>
                <div onClick={() => {setActionSelected('delete'); setAction(false);}} className="photo_section_action">Supprimer</div>
                <div onClick={() => {setActionSelected('firstPhoto'); setAction(false);}} className="photo_section_action">Définir comme photo de profil</div>
                <div onClick={() => {setActionSelected('showPhoto'); setAction(false);}} className="photo_section_action">Annuler</div>
                </>)}
              </div>
            </>
          )}
          {actionSelected === 'upload' && (
            <>
              <UploadPhoto
                setMatchaNotif={setMatchaNotif}
                index={index}
                setReloadPhotos={setReloadPhotos}
              />
            </>
          )}
          {actionSelected === 'delete' && (
            <>
              <DeletePhotos />
            </>
          )}
          {actionSelected === 'firstPhoto' && (<><FirstPhoto /></>)}
        </div>
      </div>
    </>
  );
};

export default PhotoPage;
