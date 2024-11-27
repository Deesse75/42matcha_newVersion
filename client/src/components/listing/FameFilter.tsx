import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingRoute, appRedir } from '../../appConfig/appPath';
import { useMemory } from '../../appContext/memory.context';
import Cookies from 'js-cookie';

type Props = {
  listingName: string;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const FameFilter: FC<Props> = ({ listingName, setMatchaNotif }) => {
  const nav = useNavigate();
  const memo = useMemory();
  const [fameMin, setFameMin] = useState<number | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fameMin = parseInt(e.currentTarget!.fame.value) || 0;
    if (fameMin <= 0) {
      setMatchaNotif("L'indice de popularité doit être supérieur à 0.");
      return;
    }
    setFameMin(fameMin);
  };

  useEffect(() => {
    if (!fameMin) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${listingRoute.getFameFilter}/${listingName}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('session')}`,
            },
            body: JSON.stringify({ fameMin }),
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
        setFameMin(null);
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
  }, [fameMin]);

  return (
    <>
      <form onSubmit={handleClick} className='selected_filter_form'>
        <div className='selected_filter_form_section'>
          <input
            className='selected_filter_input'
            type='number'
            min={0}
            required
            name='fame'
            id='fame'
            placeholder='Supérieur à'
          />
        </div>
        <div className='selected_filter_form_section'>
          <input
            className='selected_filter_submit'
            type='submit'
            name='fame_filter'
            id='fame_filter'
            value='Filtrer'
          />
        </div>
      </form>
    </>
  );
};

export default FameFilter;