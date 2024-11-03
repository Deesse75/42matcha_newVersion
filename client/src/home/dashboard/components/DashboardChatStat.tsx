import { FC, useEffect, useState } from 'react';
import { chatRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import convertDate from '../../../utils/convertDate';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardChatStat: FC<Props> = ({ setMatchaNotif }) => {
  const [nbMess, setNbMess] = useState<number>(0);
  const [lastMess, setLastMess] = useState<string>('');
  const [errMess, setErrMess] = useState<string>('');
  const nav = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(chatRoute.getChatStat, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          setErrMess('Erreur de chargement');
          return;
        }
        setNbMess(data.nbMess);
        setLastMess(data.lastMess);
      } catch (error) {
        if (!isMounted) return;
        setMatchaNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className='dashboard_chat_stat'>
        {errMess ? (
          <>
            <div className='dashboard_chat_stat_text'>{errMess}</div>
          </>
        ) : (
          <>
            <div className='dashboard_chat_stat_text'>
              Nombre total de messages rédigés : {nbMess > 0 ? nbMess : 'aucun'}
            </div>
            <div className='dashboard_chat_stat_text'>
              {nbMess > 0 ? `Dernier message écrit le : ${convertDate(lastMess)}` : ''}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardChatStat;
