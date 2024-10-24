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

const AgeFilter: FC<Props> = ({ setListing, setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [reqData, setReqData] = useState<{
    listingName: string;
    ageMin: number;
    ageMax: number;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const min = parseInt(e.currentTarget.agemin.value);
    const max = parseInt(e.currentTarget.agemax.value);
    if (!min || !max) {
      setMatchaNotif('Veuillez remplir les deux champs');
      return;
    }
    if (min < 18 || min > 120) {
      setMatchaNotif("L'âge minimum est incorrect");
      return;
    }
    if (max < 18 || max > 120) {
      setMatchaNotif("L'âge maximum est incorrect");
      return;
    }
    if (min > max) {
      setMatchaNotif("L'âge minimum est supérieur à l'âge maximum");
      return;
    }
    if (!me.historySelected) setMatchaNotif('Requête invalide');
    else
      setReqData({ listingName: me.historySelected, ageMin: min, ageMax: max });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getAgeFilter, {
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
          <input
            type='number'
            min={18}
            max={120}
            name='agemin'
            id='ageMin'
            placeholder='age minimum'
          />
          <input
            type='number'
            min={18}
            max={120}
            name='agemax'
            id='ageMax'
            placeholder='age maximum'
          />
          <input
            type='submit'
            name='age_filter'
            id='age_filter'
            value='Filtrer'
          />
        </form>
      </div>
    </>
  );
};

export default AgeFilter;
