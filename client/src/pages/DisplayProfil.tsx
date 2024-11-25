import { FC, useEffect, useState } from 'react';
import PageChargement from '../utils/chargement/PageChargement';
import { appRedir, profileRoute } from '../appConfig/appPath';
import Cookies from 'js-cookie';
import { useMemory } from '../appContext/memory.context';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../appContext/user.context';
import { ProfileFrontType } from '../appConfig/interface';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayProfil: FC<Props> = ({ setMatchaNotif }) => {
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileFrontType | null>(null);
  const [id, setId] = useState<number>(0);
  const [messErr, setMessErr] = useState<string | null>(null);
  const me = useUserInfo();
  const memo = useMemory();
  const nav = useNavigate();

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
    if (!memo.activeProfileId) return;
    setId(memo.activeProfileId);
    memo.setActiveProfileId(null);
  }, [memo.activeProfileId]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${profileRoute.getProfile}/${id}`, {
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
        setId(0);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setProfile(data.profile);
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
      <div className='display_profile'>
        {controlPage ? (
          <>
            {messErr ? (
              <>
                <div className='display_profile_error'>{messErr}</div>
              </>
            ) : (
              <>
                <div className='display_profile_left'>
                  <div className='dispaly_profile_photo'></div>
                  <div className='display_profile_like'></div>
                  <div className='display_profile_interaction'></div>
                </div>
                <div className='display_profile_right'>
                  <div className='display_profile_right_top'>
                    <div className='display_profile_right_top_data'></div>
                    <div className='display_profile_right_top_fame'></div>
                  </div>
                  <div className='display_profile_right_middle'>
                    <div className='display_profile_right_middle_tags'></div>
                  </div>
                  <div className='display_profile_right_bottom'>
                    <div className='display_profile_right_bottom_bio'></div>
                  </div>
                  <div className='display_profile_right_lastCo'></div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <PageChargement />
          </>
        )}
      </div>
    </>
  );
};

export default DisplayProfil;
