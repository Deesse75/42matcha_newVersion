import { FC } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import DisplayConnection from '../../display/components/DisplayConnection';
import DisplayFameRating from '../../display/components/DisplayFameRating';
import DisplayInteraction from '../../display/components/DisplayInteraction';
import DisplayMiniUserData from '../../display/components/DisplayMiniUserData';
import DisplayTags from '../../display/components/DisplayTags';

type Props = {
  key: number;
  profile: MiniProfileType;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const MiniProfile: FC<Props> = ({ profile, setMatchaNotif }) => {
  return (
    <>
      <div key={profile.id} className='mini_profile_container'>
        <div className='mini_profile_left'>
          <div className='mini_profile_left_top'>
            <img
              src={profile.photo ? profile.photo : '/avatar/default_avatar.jpg'}
              alt={
                profile.photo
                  ? 'Photo de profil personnalisée'
                  : 'Photo de profil par défaut'
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                border: 'none',
              }}
            />
          </div>
          <div className='mini_profile_left_bottom'>
            <DisplayConnection
              id={profile.id}
              lastCo={profile.lastConnection ? new Date(profile.lastConnection) : new Date()}
            />
            <DisplayFameRating fameRating={profile.fameRating} size={20} />
          </div>
        </div>

        <div className='mini_profile_right'>
          <div className='mini_profile_right_data'>
            <DisplayMiniUserData profile={profile} />
            <DisplayTags id={profile.id} setMatchaNotif={setMatchaNotif} />
          </div>
          <div className='mini_profile_right_interaction'>
            <DisplayInteraction
              id={profile.id}
              setMatchaNotif={setMatchaNotif}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniProfile;
