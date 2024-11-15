import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useMemory } from '../../appContext/memory.context';
import { useNavigate } from 'react-router-dom';
import { appRedir, listingRoute } from '../../appConfig/appPath';

type Props = {
  listingName: string;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AgeFilter: FC<Props> = ({ listingName, setMatchaNotif }) => {
  const nav = useNavigate();
  const memo = useMemory();
  const [bodyRequest, setBodyRequest] = useState<{
    listingName: string;
    ageMin: number;
    ageMax: number;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const min = e.currentTarget.agemin.value;
    const max = e.currentTarget.agemax.value;
    if (!min && !max) {
      setMatchaNotif('Veuillez renseigner un âge minimum et/ou maximum');
      return;
    }
    if (min && (min < 18 || min > 120)) {
      setMatchaNotif("L'âge minimum est incorrect");
      return;
    }
    if (max && (max < 18 || max > 120)) {
      setMatchaNotif("L'âge maximum est incorrect");
      return;
    }
    if (min && max && min > max) {
      setMatchaNotif("L'âge minimum est supérieur à l'âge maximum");
      return;
    }
    else
      setBodyRequest({
        listingName: listingName,
        ageMin: min ? parseInt(min) : 18,
        ageMax: max ? parseInt(max) : 120,
      });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getAgeFilter, {
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
  }, [bodyRequest]);

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
