import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import { IoStarOutline } from 'react-icons/io5';

type Props = {};

const FameScore: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='dashboard_fame_container'>
        <div className='dashboard_fame_title'>Indice de participation</div>
        <div className='dashboard_fame_score'>
          {me.user ? me.user.fameRating : 0}
        </div>
        <div className='dashboard_fame_icon'>
          <IoStarOutline size={50} color='#e8b22b' />
        </div>
      </div>
    </>
  );
};

export default FameScore;
