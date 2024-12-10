import { FC } from 'react';
import { useUserInfo } from '../../appContext/user.context';
import { convertDate } from '../../utils/convertDateFunctions';

type Props = {};

const DisplayInfoAccount: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='account_info_container'>
        <div className='account_info_section'>
          <div className='account_info_title'>Compte créé le : </div>
          <div className='account_info_data'>
            {me.user ? convertDate(me.user.createdAt) : null}
          </div>
        </div>
        <div className='account_info_section'>
          <div className='account_info_title'>Dernière connexion : </div>
          <div className='account_info_data'>
            {me.user && me.user.lastConnection
              ? convertDate(me.user.lastConnection)
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayInfoAccount;
