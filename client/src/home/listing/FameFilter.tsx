import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { listingRoute, appRedir } from '../../appConfig/appPath';
import { useMemory } from '../../appContext/memory.context';

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
      <div className='dashboard_filter'>
        <form onSubmit={handleClick} className='dashboard_filter_form'>
          <input
            type='number'
            min={0}
            required
            name='fame'
            id='fame'
            placeholder='Indice supérieur à'
          />
          <input
            type='submit'
            name='fame_filter'
            id='fame_filter'
            value='Filtrer'
          />
        </form>
      </div>
    </>
  );
};

export default FameFilter;
