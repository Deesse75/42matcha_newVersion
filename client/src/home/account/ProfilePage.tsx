import { FC, useState } from 'react';
import ProfileTab from './components/ProfileTab';
import ProfileDateInfo from './components/ProfileDateInfo';
import ProfileRequiered from './components/ProfileRequiered';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import ProfileOptional from './components/ProfileOptional';
import ProfileBio from './components/ProfileBio';
import ProfileTags from './components/ProfileTags';
import PhotoPage from './PhotoPage';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProfilePage: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [profileTab, setProfileTab] = useState<string>('requiered');

  return (
    <>
      <div className='profile_title'>
        Modifier/Completer vos informatios de profil
      </div>
      <div className='profile_container'>
        <div className='profile_header'>
          <div className='profile_tab'>
            <ProfileTab setProfileTab={setProfileTab} />
          </div>
        </div>
        <div className='profile_body'>
          {profileTab === 'requiered' && (
            <ProfileRequiered setMatchaNotif={setMatchaNotif} />
          )}
          {profileTab === 'optional' && (
            <ProfileOptional setMatchaNotif={setMatchaNotif} />
          )}
          {profileTab === 'bio' && (
            <ProfileBio setMatchaNotif={setMatchaNotif} />
          )}
          {profileTab === 'photo' && (
            <PhotoPage setMatchaNotif={setMatchaNotif} />
          )}
          {profileTab === 'tags' && (
            <ProfileTags setMatchaNotif={setMatchaNotif} />
          )}
        </div>
        <div className='profile_footer'>
          <div className='profile_date_info'>
            <ProfileDateInfo />
          </div>
          <div className='profile_delete'>
            <button
              onClick={() => {
                nav(appRedir.deleteProfile);
              }}
            >
              Supprimer le compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
