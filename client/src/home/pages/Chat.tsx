import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import ChatActiveList from '../components/chat/ChatActiveList';
import ChatContentPart from '../components/chat/ChatContentPart';
import ChatMatchList from '../components/chat/ChatMatchList';
import ChatMuteList from '../components/chat/ChatMuteList';
import WaitChargement from '../../utils/WaitChargement';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ChatPage: FC<Props> = ({ setMatchaNotif }) => {
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
    menu.setOneMenuOn('chat');
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
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default ChatPage;
