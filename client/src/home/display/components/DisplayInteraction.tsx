import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { profileRoute, appRedir } from '../../../appConfig/appPath';
import { GiMatchTip } from 'react-icons/gi';
import { FcLike } from 'react-icons/fc';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';

type Props = {
  id: number;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayInteraction: FC<Props> = ({ id, setMatchaNotif }) => {
  const nav = useNavigate();
  const [interaction, setInteraction] = useState<{
    actionView: boolean;
    actionLike: boolean;
    actionMatch: boolean;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${profileRoute.getInteractions}/${id}`, {
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
          setInteraction(null);
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
        {interaction ? (
          <>
            <div className='mini_user_interaction_icon'>
              {interaction.actionMatch ? (
                <>
                  <GiMatchTip />
                </>
              ) : (
                <>
                  {interaction.actionLike ? (
                    <>
                      <FcLike />
                    </>
                  ) : (
                    <>
                      {interaction.actionView ? (
                        <>
                          <FaRegEye />
                        </>
                      ) : (
                        <>
                          <FaRegEyeSlash />
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <IoReload />
            <div className="mini_user_interaction_error">Error</div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayInteraction;
