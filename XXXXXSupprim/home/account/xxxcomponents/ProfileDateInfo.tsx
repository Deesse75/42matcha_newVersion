import { FC } from 'react';
import { useUserInfo } from '../../../../appContext/user.context';
import convertDate from '../../../../utils/convertDate';

type Props = {};

const ProfileDateInfo: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='date_info_row'>
        <div className='date_info_left'>Profil créé le :</div>
        <div className='date_info_right'>
          {me.user ? convertDate(me.user.createdAt) : ''}
        </div>
      </div>
      <div className='date_info_row'>
        <div className='date_info_left'>Dernière modification :</div>
        <div className='date_info_right'>
          {me.user ? convertDate(me.user.updatedAt) : ''}
        </div>
      </div>
      <div className='date_info_row'>
        <div className='date_info_left'>Dernière connexion :</div>
        <div className='date_info_right'>
          {' '}
          {me.user
            ? me.user.lastConnection
              ? convertDate(me.user.lastConnection)
              : ''
            : ''}
        </div>
      </div>
    </>
  );
};

export default ProfileDateInfo;
