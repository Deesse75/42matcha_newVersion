import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PageChargement from '../utils/chargement/PageChargement';
import { appRedir } from '../appConfig/appPath';
import ChatActiveList from '../components/chat/ChatActiveList';
import ChatContentPart from '../components/chat/ChatContentPart';
import ChatMatchList from '../components/chat/ChatMatchList';
import ChatMuteList from '../components/chat/ChatMuteList';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ChatPage: FC<Props> = ({ setMatchaNotif }) => {
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
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
  }, [controlPage]);

  return (
    <>
      {controlPage ? (
        <>
          <div className='chat_container'>
            <div className='chat_content'>
              <ChatContentPart />
            </div>
            <div className='chat_users'>
              <div className='chat_current'>
                <ChatActiveList setMatchaNotif={setMatchaNotif} />
              </div>
              <div className='chat_match_list'>
                <ChatMatchList />
              </div>
              <div className='chat_mute_list'>
                <ChatMuteList />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PageChargement />
        </>
      )}
    </>
  );
};

export default ChatPage;
