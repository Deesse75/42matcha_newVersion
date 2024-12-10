import { FaHeart } from 'react-icons/fa';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  receiverId: number;
  interaction: string | null;
  setReloadInteraction: React.Dispatch<React.SetStateAction<boolean>>;
};

const DisplayLike: FC<Props> = ({
  setMatchaNotif,
  receiverId,
  interaction,
  setReloadInteraction,
}) => {
  const nav = useNavigate();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [action, setAction] = useState<string | null>(null);

  useEffect(() => {
    if (interaction === 'like' || interaction === 'match') setIsLike(true);
    else setIsLike(false);
  }, [interaction]);

  useEffect(() => {
    if (action !== 'deleteLike') return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${actionRoute.deleteLike}/${receiverId}`,
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
        setAction(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
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
  }, [action]);

  useEffect(() => {
    if (action !== 'addLike') return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${actionRoute.actionLike}/${receiverId}`,
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
        setAction(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
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
  }, [action]);

  return (
    <>
      <div className='display_like_container'>
        {isLike ? (
          <>
            <div className='display_like'>
              <div className='display_like_text'>Envoyer un like</div>
              <button
                className='display_like_button'
                onClick={() => {
                  setAction('addLike');
                }}
              >
                <FaHeart
                  size={30}
                  style={{ cursor: 'pointer', color: 'red' }}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='display_like'>
              <div className='display_like_text'>Supprimer votre like</div>
              <button
                className='display_like_button'
                onClick={() => {
                  setAction('deleteLike');
                }}
              >
                <FaHeartCircleCheck
                  size={30}
                  style={{ cursor: 'pointer', color: 'red' }}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayLike;
