import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, searchRoute } from '../../appConfig/appPath';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { useMemory } from '../../appContext/memory.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchByUsername: FC<Props> = ({ setMatchaNotif }) => {
  const [username, setUsername] = useState<string | null>(null);
  const refUsername = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const memo = useMemory();

  const handleSubmit = () => {
    const username = refUsername.current?.value.trim() || null;
    if (!username) {
      setMatchaNotif('Entrez un nom d utilisateur');
      return;
    }
    if (username.length < 3) {
      setMatchaNotif('Entrez au moins 3 caractères');
      return;
    }
    if (!/^[a-zA-Z]$/.test(username[0])) {
      setMatchaNotif("Le nom d'utilisateur doit commencer par une lettre.");
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
        memo.setListing(data.listing);
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
      <input
        className='search_row_input'
        type='text'
        name='username'
        id='username'
        maxLength={30}
        minLength={3}
        required
        autoComplete='off'
        ref={refUsername}
        placeholder='Rechercher par nom d utilisateur'
      />
      <button onClick={handleSubmit} className='search_row_submit'>
        <MdOutlineKeyboardDoubleArrowRight size={25} />
      </button>
    </>
  );
};

export default SearchByUsername;
