import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import { appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';

type Props = {};

const DashboardAccountData: FC<Props> = ({}) => {
  const me = useUserInfo();
  const nav = useNavigate();

  return (
    <>
      <div className='dashboard_account'>
        <div className='dashboard_account_data'>
          {me.user ? (
            <>
              <div className='dashboard_account_data_row_1'>
                {`${me.user.username},`}
              </div>
              <div className='dashboard_account_data_row'>
                {`${me.user.firstname} ${me.user.lastname}, ${me.user.age} ans`}
              </div>
              <div className='dashboard_account_data_row'>
                {me.user.region
                  ? `${me.user.region}, ${me.user.county}, ${me.user.town}`
                  : 'Erreur localisation'}
              </div>
            </>
          ) : (
            <>
              <div className=''>Erreur de chargement</div>
            </>
          )}
        </div>
        <div className='dashboard_account_data_submit'>
          <button
            className='dashboard_account_data_submit_button'
            onClick={() => {
              nav(appRedir.account);
            }}
          >
            Modifier mes données personnelles
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardAccountData;
