import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRoute, appRedir } from '../../../appConfig/appPath';
import { useMemory } from '../../../appContext/memory.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchByLocation: FC<Props> = ({ setMatchaNotif }) => {
  const [location, setLocation] = useState<string | null>(null);
  const [action, setAction] = useState<boolean>(false);
  const nav = useNavigate();
  const memo = useMemory();

  useEffect(() => {
    if (location) return;
    const region = localStorage.getItem('region') || null;
    const county = localStorage.getItem('county') || null;
    const town = localStorage.getItem('town') || null;
    if (region) setLocation(region);
    else if (county) setLocation(county);
    else if (town) setLocation(town);
    else setLocation('inconnue');
  }, []);

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
      <div className='search_location_data'>
        {location === 'inconnue'
          ? `Localisation non définie`
          : `Locaisation : ${location}`}
      </div>
      <div className='search_location_form_button'>
        {location && location !== 'inconnue' && (
          <>
            <button
              onClick={() => setAction(true)}
              name='locationSubmit'
              id='locationSubmit'
            >
              Chercher les profils aux alentours
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SearchByLocation;
