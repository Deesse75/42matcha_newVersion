import { FC, useEffect, useState } from 'react';
import { ProfileFrontType } from '../../appConfig/interface';
import DisplayConnection from './DisplayConnection';
import DisplayMiniUserData from './DisplayMiniUserData';
import { useUserInfo } from '../../appContext/user.context';
import { actionRoute, appRedir, socketRoute } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../../appContext/memory.context';

type Props = {
  key: number;
  profile: ProfileFrontType;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const MiniProfile: FC<Props> = ({ profile, setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const memo = useMemory();
  const [actionView, setActionView] = useState<boolean>(false);
  const [viewed, setViewed] = useState<boolean>(false);

  useEffect(() => {
    if (!viewed) return;

    const sendSocket = () => {
      if (me.userSocket) {
        const senderUsername: string = me!.user!.username;
        const receiverId: number = profile.id;
        me.userSocket.emit(socketRoute.sendView, senderUsername, receiverId);
        setViewed(false);
      }
    };
    sendSocket();
    nav(appRedir.displayProfile);
  }, [viewed]);

  useEffect(() => {
    if (!actionView) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${actionRoute.actionView}/${profile.id}`,
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
        setActionView(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setViewed(true);
        memo.setActiveProfileId(profile.id);
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
  }, [actionView]);

  return (
    <>
      <div
        key={profile.id}
        className='mini_profile_container'
        onClick={() => {
          setActionView(true);
        }}
      >
        <div className='mini_profile_connection'>
          <DisplayConnection profile={profile} />
        </div>
        <div className='mini_profile_user'>
          <div className='mini_profile_photo'>
            <img
              className='mini_profile_photo_img'
              src={me.user?.photo ?? '/avatar/default_avatar.jpg'}
              alt='Photo de profil'
            />
          </div>
          <div className='mini_profile_data'>
            <DisplayMiniUserData profile={profile} />
          </div>
        </div>
        <div className='mini_profile_right'></div>
      </div>
    </>
  );
};

export default MiniProfile;
