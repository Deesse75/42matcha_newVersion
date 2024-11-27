import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRoute, appRedir } from '../../appConfig/appPath';
import { useMemory } from '../../appContext/memory.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchByLocation: FC<Props> = ({ setMatchaNotif }) => {
  const [action, setAction] = useState<boolean>(false);
  const nav = useNavigate();
  const memo = useMemory();

  useEffect(() => {
    if (!action) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${searchRoute.searchLocation}`, {
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
        setAction(false);
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
  }, [action]);

  return (
    <>
      <div className='search_col_section'>
        <div className='search_col_section_text'>
          Région : {localStorage.getItem('region') ?? ''}
        </div>
        <div className='search_col_section_text'>
          Département : {localStorage.getItem('county') ?? ''}
        </div>
        <div className='search_col_section_text'>
          Ville : {localStorage.getItem('town') ?? ''}
        </div>
      </div>
      <button
        className='search_col_submit'
        onClick={() => setAction(true)}
        name='locationSubmit'
        id='locationSubmit'
      >
        Chercher les profils aux alentours
      </button>
    </>
  );
};

export default SearchByLocation;
