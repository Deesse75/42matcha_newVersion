import { FC } from 'react';
import DashboardChatMatch from './DashboardChatMatch';
import DashboardChatUnseen from './DashboardChatUnseen';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardChat: FC<Props> = ({ setMatchaNotif }) => {
  return (
    <>
      <div className='dashboard_chat_container'>
        <DashboardChatMatch setMatchaNotif={setMatchaNotif} />
        <DashboardChatUnseen setMatchaNotif={setMatchaNotif} />
      </div>
    </>
  );
};

export default DashboardChat;
