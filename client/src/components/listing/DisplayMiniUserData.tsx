import { FC, useState, useEffect } from 'react';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  profile: ProfileFrontType;
};

const DisplayMiniUserData: FC<Props> = ({ profile }) => {
  const [location, setLocation] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<string | null>(null);

  useEffect(() => {
    if (profile.town) setLocation(`${profile.town}, ${profile.region}`);
    else if (profile.county)
      setLocation(`${profile.county}, ${profile.region}`);
    else setLocation(profile.region);
    if (profile.gender && profile.orientation)
      setPreferences(`${profile.gender}, ${profile.orientation}`);
    else if (profile.gender && !profile.orientation)
      setPreferences(profile.gender);
    else if (!profile.gender && profile.orientation)
      setPreferences(profile.orientation);
    else setPreferences('');
  }, [profile]);

  return (
    <>
      <div className='mini_user'>
        <div className='mini_user_data1'>
          <div className='mini_user_username'>{profile.username}</div>
          <div className='mini_user_location'>{`${profile.age} ans, ${location}`}</div>
        </div>
        <div className='mini_user_data2'>
          <div className='mini_user_text'>{`${preferences}`}</div>
          <div className='mini_user_text'>
            {profile.tags &&
              profile.tags.map((tag, key) => (
                <span
                  key={key}
                  className='mini_user_one_tag'
                >{`#${tag} `}</span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayMiniUserData;
