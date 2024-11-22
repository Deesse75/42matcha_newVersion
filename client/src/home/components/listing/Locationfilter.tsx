import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingRoute, appRedir } from '../../../appConfig/appPath';
import { useMemory } from '../../../appContext/memory.context';
import Cookies from 'js-cookie';

type Props = {
  listingName: string;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Locationfilter: FC<Props> = ({ listingName, setMatchaNotif }) => {
  const nav = useNavigate();
  const memo = useMemory();
  const [zone, setZone] = useState<string | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const zone: string = e.currentTarget.location_zone.value;
    if (zone === 'default') {
      setMatchaNotif('Veuillez choisir une zone de filtrage');
      return;
    }
    setZone(zone);
  };

  useEffect(() => {
    if (!zone) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${listingRoute.getLocationFilter}/${listingName}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('session')}`,
            },
            body: JSON.stringify({ zone }),
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
        setZone(null);
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
  }, [zone]);

  return (
    <>
      <div className='dashboard_filter'>
        <form onSubmit={handleClick} className='dashboard_filter_form'>
          <select name='location_zone' id='location_zone'>
            <option defaultValue='default'>Zone de filtrage</option>
            <option value='town'>Ville</option>
            <option value='county'>Département</option>
            <option value='region'>Région</option>
          </select>
          <input
            type='submit'
            name='location_submit'
            id='location_submit'
            value='Filtrer'
          />
        </form>
      </div>
    </>
  );
};

export default Locationfilter;
