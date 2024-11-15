import { FC, useEffect, useState } from 'react';
import { MiniProfileFrontType } from '../../appConfig/interface';

type Props = {
  profile: MiniProfileFrontType;
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
      <div className='mini_user_data'>
        <div className='mini_user_data_username'>{profile.username}</div>
        <div className='mini_user_data_info'>{`${profile.age} ans, ${location}`}</div>
        <div className='mini_user_data_info'>{`${preferences}`}</div>
      </div>
    </>
  );
};

export default DisplayMiniUserData;
