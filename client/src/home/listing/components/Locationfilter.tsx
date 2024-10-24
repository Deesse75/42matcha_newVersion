import { FC, useEffect, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { appRedir, listingRoute } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../appContext/user.context';

type Props = {
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Locationfilter: FC<Props> = ({ setListing, setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [reqData, setReqData] = useState<{
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
    if (!me.historySelected) setMatchaNotif('Requête invalide');
    else
      setReqData({
        listingName: me.historySelected,
        zone: zone,
      });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getLocationFilter, {
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
