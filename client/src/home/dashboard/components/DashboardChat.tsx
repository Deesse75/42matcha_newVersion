import { FC } from 'react';
import DashboardChatStat from './DashboardChatStat';
import DashboardChatMatch from './DashboardChatMatch';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardChat: FC<Props> = ({ setMatchaNotif }) => {

  return (
    <>
      <div className='dashboard_chat_container'>
          <DashboardChatMatch setMatchaNotif={setMatchaNotif} />
          <DashboardChatStat setMatchaNotif={setMatchaNotif} />
        
      </div>
    </>
  );
};

export default DashboardChat;
