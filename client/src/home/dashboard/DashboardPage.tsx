import { FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import MiniHistory from './components/MiniHistory';
import DashboardAccountData from './components/DashboardAccountData';
import FameScore from './components/FameScore';
import DashboardAccountInfo from './components/DashboardAccountInfo';
import DashboardChat from './components/DashboardChat';
import DashboardDeleteAccount from './components/DashboardDeleteAccount';
import DashboardProfile from './components/DashboardProfile';
import DashboardSearch from './components/DashboardSearch';
import DashboardPhoto from './components/DashboardPhoto';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardPage: FC<Props> = ({}) => {
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
        <div className='dashboard_mini_history'>
          <MiniHistory />
        </div>
        <div className='dashboard_body'>
          <div className='dashboard_body_row'>
            <DashboardPhoto />
            <DashboardAccountData />
            <DashboardAccountInfo />
            <FameScore />
          </div>
          <div className='dashboard_body_row'>
            <DashboardProfile />
          </div>
          <div className='dashboard_body_row'>
            <DashboardSearch />
            <DashboardChat />
            </div>
          <div className='dashboard_body_row'>
            <DashboardDeleteAccount />
            </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
