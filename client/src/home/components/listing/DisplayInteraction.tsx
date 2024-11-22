import { FC, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { GiMatchTip } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { actionRoute, appRedir } from '../../../appConfig/appPath';
import { FcLike } from 'react-icons/fc';
import Cookies from 'js-cookie';

type Props = {
  id: number;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayInteraction: FC<Props> = ({ id, setMatchaNotif }) => {
  const nav = useNavigate();
  const [interaction, setInteraction] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${actionRoute.getInteractions}/${id}`, {
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
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setInteraction(data.interactions);
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
  }, []);

  return (
    <>
      <div className='mini_user_interaction'>
        <div className='mini_user_interaction_icon'>
          {interaction ? (
            <>
              {interaction === 'match' && (
                <>
                  <GiMatchTip />
                </>
              )}
              {interaction === 'like' && (
                <>
                  <FcLike />
                </>
              )}
              {interaction === 'view' && (
                <>
                  <FaRegEye />
                </>
              )}
            </>
          ) : (
            <>
              <FaRegEyeSlash />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayInteraction;
