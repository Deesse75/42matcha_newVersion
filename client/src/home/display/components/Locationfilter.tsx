import { FC, useEffect, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { appRedir, listingRoute } from '../../../appConfig/appPath';
import { useUserInfo } from '../../../appContext/user.context';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  listingName: string;
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Locationfilter: FC<Props> = ({
  listingName,
  setListing,
  setMatchaNotif,
}) => {
  const [urlFilter, setUrlFilter] = useState<string | null>(null);
  const [locationProfile, setLocationProfile] = useState<boolean>(false);
  const [locationGeoloc, setLocationGeoloc] = useState<boolean>(false);
  const me = useUserInfo();
  const nav = useNavigate();
  const [reqData, setReqData] = useState<{
    region: string;
    county: string;
    town: string;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (locationProfile) {
      if (listingName === 'matcha')
        setUrlFilter(listingRoute.getLocationFilterMatchaList);
      else if (listingName === 'view')
        setUrlFilter(listingRoute.getLocationFilterViewList);
      else if (listingName === 'like')
        setUrlFilter(listingRoute.getLocationFilterLikeList);
      setReqData({
        region: me.user ? me.user.region : '',
        county: me.user && me.user.county ? me.user.county : '',
        town: me.user && me.user.town ? me.user.town : '',
      })
    }
    else if (locationGeoloc) {
      if (listingName === 'matcha')
        setUrlFilter(listingRoute.getGeolocFilterMatchaList);
      else if (listingName === 'view')
        setUrlFilter(listingRoute.getGeolocFilterViewList);
      else if (listingName === 'like')
        setUrlFilter(listingRoute.getGeolocFilterLikeList);
      setReqData({
        region: Cookies.get('region') ? Cookies.get('region') : '',
        county: Cookies.get('county') ? Cookies.get('county') : '',
        town: Cookies.get('town') ? Cookies.get('town') : '',
      })
    }
    else {
      setMatchaNotif('Veuillez choisir la localisation du profil ou la géolocalisation');
      return;
    }
  };

  useEffect(() => {
    if (locationProfile) setLocationGeoloc(false);
  }, [locationProfile]);

  useEffect(() => {
    if (locationGeoloc) setLocationProfile(false);
  }, [locationGeoloc]);

  useEffect(() => {
    if (!reqData || !urlFilter) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(urlFilter, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(reqData),
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
        setReqData(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          setListing(null);
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
  }, [reqData]);

  return (
    <>
      <div className='dashboard_filter_location'>
        <div className='dashboard_filter_location_text'>Localisation</div>
        <form onSubmit={handleClick} className='dashboard_form_location'>
          <div className='dashboard_form_location_part'>
            <label htmlFor='location_input'>Profil</label>
            <input
              onChange={() => {
                setLocationProfile(!locationProfile);
              }}
              type='checkbox'
              name='location_input'
              id='location_input'
              checked={locationProfile}
            />
            <label htmlFor='geolocation_input'>Géolocalisation</label>
            <input
              onChange={() => {
                setLocationGeoloc(!locationGeoloc);
              }}
              type='checkbox'
              name='geolocation_input'
              id='geolocation_input'
              checked={locationGeoloc}
            />
          </div>
          <input type='submit' name='' id='' value='Filtrer' />
        </form>
      </div>
    </>
  );
};

export default Locationfilter;
