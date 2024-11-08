import { FC, useEffect, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { appRedir, profileRoute } from '../../../appConfig/appPath';
import { useUserInfo } from '../../../appContext/user.context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

type Props = {
  profile: MiniProfileType;
  key: number;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardMatchEdit: FC<Props> = ({ profile, setMatchaNotif }) => {
  const [id, setId] = useState<number>(0);
  const me = useUserInfo();
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${profileRoute.getDisplayProfile}/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('session')}`,
            },
          },
        );
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
          setId(0);
          setMatchaNotif(data.message);
          return;
        }
        me.setProfileData(data.profileData);
        nav(appRedir.userProfile);
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
  }, [id]);

  return (
    <>
      <div key={profile.id} className='dashboard_chat_section_one_content'>
        <div className='dashboard_chat_section_one_content_username'>
          {profile.username}
        </div>
        <button
          onClick={() => {
            setId(profile.id);
          }}
          className='dashboard_chat_section_one_content_button'
        >
          Voir
        </button>
        <button
          onClick={() => {
            me.setActiveChatId(profile.id);
            nav(appRedir.chat);
          }}
          className='dashboard_chat_section_one_content_button'
        >
          Discuter
        </button>
      </div>
    </>
  );
};

export default DashboardMatchEdit;
