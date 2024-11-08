import { FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import DashboardAccountData from './components/DashboardAccountData';
import FameScore from './components/FameScore';
import DashboardAccountInfo from './components/DashboardAccountInfo';
import DashboardChat from './components/DashboardChat';
import DashboardSearch from './components/DashboardSearch';
import DashboardPhoto from './components/DashboardPhoto';
import DashboardProfile from './components/DashboardProfile';
import DashboardChatStat from './components/DashboardChatStat';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardPage: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();

  useEffect(() => {
    if (!Cookies.get('session') || !Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
  }, []);

  return (
    <>
      <div className='dashboard_container'>
        <div className='dashboard_account_container'>
          <DashboardPhoto />
          <DashboardAccountData />
          <FameScore />
          <div className='dashboard_info'>
            <DashboardAccountInfo />
            <DashboardChatStat setMatchaNotif={setMatchaNotif} />
          </div>
        </div>
        <div className='dashboard_profile_container'>
          <DashboardProfile />
        </div>
        <div className='dashboard_other_container'>
          <DashboardSearch setMatchaNotif={setMatchaNotif} />
          <DashboardChat setMatchaNotif={setMatchaNotif} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
