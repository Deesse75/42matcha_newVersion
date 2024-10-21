import { FC, useEffect, useState } from 'react';
import {
  appRedir,
  profileRoute,
} from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: number;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayTags: FC<Props> = ({ id, setMatchaNotif }) => {
  const nav = useNavigate();
  const [tags, setTags] = useState<string[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(profileRoute.getDisplayTags, {
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
          setTags(null);
          return;
        }
        setTags(data.tags);
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
      <div className='mini_user_tags'>
        {tags && (
          <>
            {tags.map((tag, index) => {
              const breakIndex = index > 0 ? ', ' : '';
              <div className='mini_user_one_tag' key={index}>{`${breakIndex}${tag}`}</div>;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default DisplayTags;
