import { FC } from 'react';
import { useUserInfo } from '../../appContext/user.context';

type Props = {};

const ProfilePage: FC<Props> = ({}) => {
  const me = useUserInfo();
  console.log (me.user?.photo1)
  return <div>
    <img src={me.user && me.user.photo1 ? me.user.photo1 : 'avatar/default_avatar.jpg'} alt="" style={{width: '300px', height: '300px'}} />
  </div>;
};

export default ProfilePage;
