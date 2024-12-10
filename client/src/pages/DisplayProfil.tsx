import { FC, useEffect, useState } from 'react';
import PageChargement from '../utils/chargement/PageChargement';
import { actionRoute, appRedir, userRoute } from '../appConfig/appPath';
import Cookies from 'js-cookie';
import { useMemory } from '../appContext/memory.context';
import { useNavigate } from 'react-router-dom';
import { ProfileFrontType } from '../appConfig/interface';
import DisplayConnection from '../components/listing/DisplayConnection';
import DisplayBanIcon from '../components/listing/DisplayBanIcon';
import DisplayLike from '../components/listing/DisplayLike';
import DisplayInteraction from '../components/listing/DisplayInteraction';
import DisplayAllPhotos from '../components/listing/DisplayAllPhoto';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayProfil: FC<Props> = ({ setMatchaNotif }) => {
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileFrontType | null>(null);
  const [messErr, setMessErr] = useState<string | null>(null);
  const [interaction, setInteraction] = useState<string | null>(null);
  const [reloadInteraction, setReloadInteraction] = useState<boolean>(false);
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
    if (memo.activeProfileId === -1) {
      setProfile(null);
      setInteraction(null);
      return;
    }
  }, [memo.activeProfileId]);

  useEffect(() => {
    if (!memo.activeProfileId) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${userRoute.getProfile}/${memo.activeProfileId}`,
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
        memo.setActiveProfileId(0);
        if (response.status !== 200) {
          setMessErr(data.message);
          return;
        }
        setProfile(data.profile);
        setReloadInteraction(true);
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
  }, [memo.activeProfileId]);

  useEffect(() => {
    if (!reloadInteraction) return;
    if (!profile) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${actionRoute.getInteractions}/${profile.id}`,
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
        setReloadInteraction(false);
        if (response.status !== 200) {
          setMessErr(data.message);
          return;
        }
        setInteraction(data.interaction);
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
  }, [reloadInteraction]);

  return (
    <>
      <div className='display_profile_container'>
        {controlPage ? (
          <>
            {messErr ? (
              <>
                <div className='display_profile_error'>{messErr}</div>
              </>
            ) : (
              <>
                {profile && (
                  <>
                    <div className='display_profile_header'>
                      <div className='display_profile_connection'>
                        <DisplayConnection profile={profile} />
                      </div>
                    </div>
                    <div className='display_profile_body'>
                      <div className='display_profile_left'>
                        <div className='display_profile_photo'>
                          <img
                            className='account_photo'
                            src={
                              profile?.photo
                                ? profile.photo
                                : '/avatar/default_avatar.jpg'
                            }
                            alt='Photo de profil'
                          />
                        </div>
                        <div className='display_profile_like'>
                          {profile?.photo && (
                            <DisplayLike
                              setMatchaNotif={setMatchaNotif}
                              receiverId={profile.id}
                              interaction={interaction}
                              setReloadInteraction={setReloadInteraction}
                            />
                          )}
                        </div>
                        <div className='display_profile_ban'>
                          <DisplayBanIcon
                            id={profile.id}
                            setMatchaNotif={setMatchaNotif}
                          />
                        </div>
                        <div className='display_photo_plus'>
                          <DisplayAllPhotos
                            profile={profile}
                            setMatchaNotif={setMatchaNotif}
                          />
                        </div>
                      </div>
                      <div className='display_profile_right'>
                        <div className='display_profile_right_top'>
                            <div className='display_profile_right_top_username'>{profile?.username}</div>
                          <div className='display_profile_interaction'>
                            <DisplayInteraction
                              interaction={interaction}
                              profile={profile}
                            />
                          </div>
                          <div className='display_profile_right_top_data'></div>
                          <div className='display_profile_right_top_fame'></div>
                        </div>
                        <div className='display_profile_right_middle'>
                          <div className='display_profile_right_middle_tags'></div>
                        </div>
                        <div className='display_profile_right_bottom'>
                          <div className='display_profile_right_bottom_bio'></div>
                        </div>
                      </div>
                    </div>
                    <div className='display_profile_bottom'>
                      <div className='display_profile_prev'></div>
                      <div className='display_profile_next'></div>
                    </div>
                  </>
                )}
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
