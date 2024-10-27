import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';

type Props = {};

const DashboardPhoto: FC<Props> = ({}) => {
  const me = useUserInfo();

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
      </div>
    </>
  );
};

export default DashboardPhoto;
