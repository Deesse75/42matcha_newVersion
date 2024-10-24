import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import convertDate from '../../../utils/convertDate';

type Props = {};

const DashboardAccountInfo: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='dashboard_account_info'>
        <div className='dashboard_account_info_row'>
          <div className='dashboard_account_info_row_text'>
            Compte créé le :
          </div>
          <div className='dashboard_account_info_row_value'>
            {me.user ? convertDate(me.user.createdAt) : ''}
          </div>
        </div>
        <div className='dashboard_account_info_row'>
          <div className='dashboard_account_info_row_text'>
            Compte modifié le :
          </div>
          <div className='dashboard_account_info_row_value'>
            {me.user ? convertDate(me.user.updatedAt) : ''}
          </div>
        </div>
        <div className='dashboard_account_info_row'>
          <div className='dashboard_account_info_row_text'>
            Dernière connexion le :
          </div>
          <div className='dashboard_account_info_row_value'>
            {(me.user && me.user.lastConnection) ? convertDate(me.user.lastConnection) : ''}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAccountInfo;
