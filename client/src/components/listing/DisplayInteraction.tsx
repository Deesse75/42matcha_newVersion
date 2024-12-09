import { FC } from 'react';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  interaction: string | null;
  profile: ProfileFrontType | null;
};

const DisplayInteraction: FC<Props> = ({ interaction, profile }) => {
  return (
    <>
      <div className='display_interaction'>
        {interaction === 'match' && (
          <>
            <button className='display_interaction_button'>{`${profile?.username} et vous avez matché`}</button>
          </>
        )}
        {interaction === 'like' && (
          <>
            <button className='display_interaction_button'>{`${profile?.username} a liké votre profil`}</button>
          </>
        )}
        {interaction === 'view' && (
          <>
            <button className='display_interaction_button'>{`${profile?.username} a vu votre profil`}</button>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayInteraction;
