import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  listingName: string;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Locationfilter: FC<Props> = ({
  listingName,
  setListing,
  setMatchaNotif,
}) => {
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    listingName: string;
    zone: string;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const zone: string = e.currentTarget.location_zone.value;
    if (zone === 'default') {
      setMatchaNotif('Veuillez choisir une zone de filtrage');
      return;
    }
    setBodyRequest({
      listingName,
      zone,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getLocationFilter, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(bodyRequest),
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
        setBodyRequest(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setListing(data.listing);
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
  }, [bodyRequest]);

  return (
    <>
      <form onSubmit={handleClick} className='selected_filter_form'>
        <select
          name='location_zone'
          id='location_zone'
          className='selected_filter_select'
        >
          <option defaultValue='default'>Zone</option>
          <option value='town'>Ville</option>
          <option value='county'>Département</option>
          <option value='region'>Région</option>
        </select>
        <input
          className='selected_filter_submit'
          type='submit'
          name='location_submit'
          id='location_submit'
          value='Filtrer'
        />
      </form>
    </>
  );
};

export default Locationfilter;
