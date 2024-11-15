import { FC } from 'react';
import { useUserInfo } from '../../../../appContext/user.context';

type Props = {};

const DashboardPhoto: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='dashboard_photo_container'>
        <img
          className='dashboard_photo'
          src={
            me.user && me.user.photo
              ? me.user.photo
              : '/avatar/default_avatar.jpg'
          }
          alt='Photo de profil'
        />
      </div>
    </>
  );
};

export default DashboardPhoto;
