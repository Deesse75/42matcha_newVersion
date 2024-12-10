import { FC } from 'react';
import { useUserInfo } from '../../../../appContext/user.context';

type Props = {};

const DashboardAccountData: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='dashboard_account'>
        <div className='dashboard_account_data'>
          {me.user ? (
            <>
              <div className='dashboard_account_data_part'>
                <div className='dashboard_account_data_row_1'>
                  {`${me.user.username},`}
                </div>
                <div className='dashboard_account_data_row'>
                  {`${me.user.firstname} ${me.user.lastname}, ${me.user.age} ans`}
                </div>
                <div className='dashboard_account_data_row'>
                  {me.user.region ? `${me.user.region}, ` : ''}
                  {me.user.county ? `${me.user.county}, ` : ''}
                  {me.user.town ? `${me.user.town},` : ''}
                </div>
              </div>
              <div className='dashboard_account_data_part'>
                <div className='dashboard_account_data_row'>
                  Genre :{me.user.gender ? `${me.user.gender} ` : '-'}
                </div>
                <div className='dashboard_account_data_row'>
                  Orientation sexuelle :
                  {me.user.orientation ? `${me.user.orientation}` : '-'}
                </div>
                <div className='dashboard_account_data_row'>
                  Taille :{me.user.tall ? `${me.user.tall} cm` : '-'}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=''>Erreur de chargement</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardAccountData;
