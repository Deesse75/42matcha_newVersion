import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { appRedir, searchRoute } from '../../../appConfig/appPath';
import { useUserInfo } from '../../../appContext/user.context';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchByLastConnection: FC<Props> = ({ setMatchaNotif }) => {
  const [action, setAction] = useState<boolean>(false);
  const nav = useNavigate();
  const me = useUserInfo();

  useEffect(() => {
    if (!action) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(searchRoute.searchLastConnection, {
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
          setAction(false);
          setMatchaNotif(data.message);
          return;
        }
        me.setSearchResult(data.searchResult);
        nav(appRedir.search);
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
      <div className='one_critere'>
        <div className='one_critere_text'>
          Rechercher les profils récemment connectés
        </div>
        <button
          onClick={() => {
            setAction(true);
          }}
        >
          <MdOutlineKeyboardDoubleArrowRight size={20} />
        </button>
      </div>
    </>
  );
};

export default SearchByLastConnection;
