import { FC } from "react";
import { UnseenMessageType } from "../../../../appConfig/interface";
import { useNavigate } from "react-router-dom";
import { appRedir } from "../../../../appConfig/appPath";
import { useUserInfo } from "../../../../appContext/user.context";

type Props = {
  notif: UnseenMessageType;
  key: number;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardMessEdit: FC<Props> = ({ notif, setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();

  // useEffect(() => {
  //   if (!id) return;
  //   let isMounted = true;
  //   const request = async () => {
  //     try {
  //       const response = await fetch(
  //         `${chatRoute.markMessageSeen}/${id}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${Cookies.get('session')}`,
  //           },
  //         },
  //       );
  //       const data = await response.json();
  //       if (!isMounted) return;
  //       if (data.message && data.message.split(' ')[0] === 'Token') {
  //         setMatchaNotif(data.message);
  //         nav(appRedir.signout);
  //         return;
  //       }
  //       if (response.status === 500) {
  //         setMatchaNotif(data.message);
  //         nav(appRedir.errorInternal);
  //         return;
  //       }
  //       setId(0);
  //       if (response.status !== 200) {
  //         setMatchaNotif(data.message);
  //         return;
  //       }
  //       if (redir) {
  //         me.setActiveChatId(notif.senderId);
  //         setRedir(false);
  //         nav(appRedir.chat);
  //         return;
  //       }
  //       setLoaded(false);
  //     } catch (error) {
  //       if (!isMounted) return;
  //       setMatchaNotif((error as Error).message);
  //       nav(appRedir.errorInternal);
  //     }
  //   };
  //   request();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [id]);

  return (
    <>
      <div key={notif.id} className="dashboard_chat_section_one_content">
        <div className="dashboard_chat_section_one_content_username">
          {notif.senderUsername}
        </div>
        <button
          className="dashboard_chat_section_one_content_button"
          onClick={() => {
            me.setActiveChatId(notif.senderId);
            nav(appRedir.chat);
          }}
        >
          Lire
        </button>
        <button className="dashboard_chat_section_one_content_button">
          Muet
        </button>
      </div>
    </>
  );
};

export default DashboardMessEdit;
