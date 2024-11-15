import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRedir } from "../../appConfig/appPath";
import { useSelectMenu } from "../../appContext/selectMenu.context";
import { useUserInfo } from "../../appContext/user.context";
import Cookies from 'js-cookie';
import ChatHeaderContent from "./components/ChatHeaderContent";

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ChatPage: FC<Props> = ({}) => {
  const menu = useSelectMenu();
  const nav = useNavigate();
  const me = useUserInfo();
  const [reloadMessageUserId, setReloadMessageUserId] = useState<number>(0);

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      menu.setAllMenuOff();
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session') || !me.user) {
      menu.setAllMenuOff();
      nav(appRedir.getMe);
      return;
    }
    menu.setOneMenuOn('chat');
  }, []);

  useEffect(() => {
    if (!reloadMessageUserId) return;
    
  }, [reloadMessageUserId]);

  return (
    <>
      <div className='chat_container'>
        <div className="chat_header_container">
          <ChatHeaderContent 
            setReloadMessageUserId={setReloadMessageUserId}
          />
        </div>
        <div className='chat_message_container'>
        </div>
      </div>
    </>
  );
}

export default ChatPage