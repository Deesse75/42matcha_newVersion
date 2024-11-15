import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { usernameValidation } from '../../../utils/inputValidation';
import { appRedir, searchRoute } from '../../../appConfig/appPath';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchByUsername: FC<Props> = ({ setMatchaNotif }) => {
  const [username, setUsername] = useState<string | null>(null);
  const refUsername = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const handleClick = () => {
    const username = refUsername.current?.value.trim();
    if (!username || username.length < 3) {
      setMatchaNotif('Entrez au moins 3 caractères');
      return;
    }
    if (!usernameValidation(username)) {
      setMatchaNotif("Le format du nom d'utilisateur entré n'est pas valide");
      return;
    }
    setUsername(username);
  };

  useEffect(() => {
    if (!username) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${searchRoute.searchUsername}/${username}`,
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
        setUsername(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
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
  }, [username]);

  return (
    <>
      <div className='search_one'>
        <input
          className='search_one_username'
          type='text'
          name='searchUsername'
          id='searchUsername'
          autoComplete='username'
          min={3}
          max={30}
          ref={refUsername}
          placeholder='Entrer au moins 3 lettres'
        />
        <button className='search_one_button' onClick={handleClick}>
          <MdOutlineKeyboardDoubleArrowRight size={20} />
        </button>
      </div>
    </>
  );
};

export default SearchByUsername;
