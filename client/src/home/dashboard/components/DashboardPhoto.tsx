import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';

type Props = {};

const DashboardPhoto: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='dashboard_photo'>
          <img
          className='dashboard_photo_img'
            src={
              me.user && me.user.photo1
                ? me.user.photo1
                : '/avatar/default_avatar.jpg'
            }
            alt='Photo de profil'
          />
      </div>
    </>
  );
};

export default DashboardPhoto;