import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, chatRoute } from '../../../appConfig/appPath';
import { UnseenMessageType } from '../../../appConfig/interface';
import Cookies from 'js-cookie';
import DashboardMessEdit from './DashboardMessEdit';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardChatUnseen: FC<Props> = ({ setMatchaNotif }) => {
  const [errMess, setErrMess] = useState<string>('');
  const [unseenList, setUnseenlist] = useState<UnseenMessageType[] | null>(
    null,
  );
  const [currentUnseenList, setCurrentUnseenList] = useState<
    UnseenMessageType[]
  >([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!unseenList) return;
    setCurrentUnseenList(unseenList);
    setUnseenlist(null);
  }, [unseenList]);

  useEffect(() => {
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(chatRoute.getUnseenMessage, {
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
        setUnseenlist(data.unseenList);
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
      <div className='dashboard_chat_section'>
        <div className='dashboard_chat_section_title'>
          {`Message(s) non lu(s) : ${currentUnseenList.length}`}
        </div>
        <div className='dashboard_chat_section_content'>
          {errMess ? (
            <>
              <div>{errMess}</div>
            </>
          ) : (
            <>
              {currentUnseenList.length > 0 ? (
                currentUnseenList.map((notif, index) => (
                  <DashboardMessEdit
                    notif={notif}
                    key={index as number}
                    setMatchaNotif={setMatchaNotif}
                  />
                ))
              ) : (
                <>
                  <div className='dashboard_chat_unseen_empty'>
                    Auncun message non lu
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardChatUnseen;
