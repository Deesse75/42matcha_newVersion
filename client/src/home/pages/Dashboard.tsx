import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import WaitChargement from '../../utils/WaitChargement';
import DashboardList from '../components/dashboard/DashboardList';
import DashboardMatchaList from '../components/dashboard/DashboardMatchaList'; 
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Dashboard: FC<Props> = ({ setMatchaNotif }) => {
  const menu = useSelectMenu();
  const nav = useNavigate();
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    menu.setDisplayAppMenu(true);
    menu.setAllMenuOff();
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
    menu.setOneMenuOn('dashboard');
  }, [controlPage]);

  return (
    <>
      {controlPage ? (
        <>
          <div className='dashboard_container'>
            <div className='dashboard_matcha_list'>
              <DashboardMatchaList setMatchaNotif={setMatchaNotif} />
            </div>
            <div className='dashboard_users'>
              <div className='dashboard_users_match'>
                <DashboardList
                  listingName={'match'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
              <div className='dashboard_users_like'>
                <DashboardList
                  listingName={'like'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
              <div className='dashboard_users_view'>
                <DashboardList
                  listingName={'view'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
            </div>
            <div className='dashboard_me'>
              <div className='dashboard_visited'>
                <DashboardList
                  listingName={'visited'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
              <div className='dashboard_liked'>
                <DashboardList
                  listingName={'liked'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
              <div className='dashboard_chat'>
                <DashboardList
                  listingName={'chat'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
            </div>
            <div className='dashboard_black_list'>
              <div className='dashboard_banned'>
                <DashboardList
                  listingName={'banned'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
              <div className='dashboard_mute'>
                <DashboardList
                  listingName={'mute'}
                  setMatchaNotif={setMatchaNotif}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default Dashboard;
