import { FC, useEffect, useState } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import EditOneTag from './EditOneTag';
import { useNavigate } from 'react-router-dom';
import AddTag from './AddTag';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateTags: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [reloadTags, setReloadTags] = useState<boolean>(false);

  useEffect(() => {
    if (!reloadTags) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getUserTags, {
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
        setReloadTags(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        me.setUserTags(data.userTags);
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
  }, [reloadTags]);

  return (
    <>
      <div className='account_tags_container'>
        <div className='account_tags_title'>Centre d'intêret</div>
        <div className='account_tags_edit'>
          {me.userTags ? (
            <>
              {me.userTags.map((tag, key) => (
                <EditOneTag
                  tag={tag}
                  key={key as number}
                  setMatchaNotif={setMatchaNotif}
                  setReloadTags={setReloadTags}
                />
              ))}
            </>
          ) : (
            <>
              <div className='account_tag_empty'>Non renseigné</div>
            </>
          )}
        </div>
        <div className='account_tags_add'>
          <AddTag
            setMatchaNotif={setMatchaNotif}
            setReloadTag={setReloadTags}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateTags;
