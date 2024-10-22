import { FC, useState } from 'react';
import { useUserInfo } from '../../appContext/user.context';
import ProfileTab from './components/ProfileTab';
import ProfileDateInfo from './components/ProfileDateInfo';
import ProfileRequiered from './components/ProfileRequiered';

type Props = {
  setMatchaMenuIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProfilePage: FC<Props> = ({ setMatchaMenuIcon, setMatchaNotif}) => {
  const me = useUserInfo();
  const [profileTab, setProfileTab] = useState<string>('requiered');

  return (
    <>
      <div className='profile_title'>Modifier/Completer votre profil</div>
      <div className='profile_container'>
        <div className='profile_top'>
          {profileTab === 'requiered' && (<ProfileRequiered setMatchaNotif={setMatchaNotif} />)}
          {profileTab === 'optional' && ()}
          {profileTab === 'bio' && ()}
          {profileTab === 'photo' && ()}
          {profileTab === 'tags' && ()}
        </div>
        <div className='profile_bottom'>
          <div className="profile_tab"><ProfileTab setProfileTab={setProfileTab} /></div>
          <div className="profile_date_info"><ProfileDateInfo /></div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
