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
              src={
                profile.photo1 ? profile.photo1 : '/avatar/default_avatar.jpg'
              }
              alt={
                profile.photo1
                  ? 'Photo de profil personnalisée'
                  : 'Photo de profil par défaut'
              }
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                border: 'none',
              }}
            />
          </div>
          <div className='mini_profile_left_bottom'>
            <DisplayConnection
              id={profile.id}
              lastCo={profile.lastConnection ? profile.lastConnection : null}
            />
            <DisplayFameRating fameRating={profile.fameRating} size={20} />
          </div>
        </div>

        <div className='mini_profile_right'>
          <div className='mini_profile_right_data'>
            <DisplayMiniUserData profile={profile} />
            <div className='mini_user_tags'>
              {profile.tags && (
                <>
                  {profile.tags.map((tag, index) => (
                    <DisplayTags key={index as number} tag={tag} />
                  ))}
                </>
              )}
            </div>
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
