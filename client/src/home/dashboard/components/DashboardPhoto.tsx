import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import { appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';

type Props = {};

const DashboardPhoto: FC<Props> = ({}) => {
  const me = useUserInfo();
  const nav = useNavigate();

  return (
    <>
      <div className='dashboard_photo_container'>
        <div className='dashboard_photo_img'>
          <img
            src={
              me.user && me.user.photo1
                ? me.user.photo1
                : '/avatar/default_avatar.jpg'
            }
            alt='Photo de profil'
            style={{ width: '100px', height: '100px' }}
          />
        </div>
        <div className='dashboard_photo_button'>
          <button onClick={() => {nav(appRedir.photo)}}>Ajouter/Modifier vos photos</button>
        </div>
      </div>
    </>
  );
};

export default DashboardPhoto;
