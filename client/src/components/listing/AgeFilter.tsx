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

const AgeFilter: FC<Props> = ({ listingName, setListing, setMatchaNotif }) => {
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    listingName: string;
    ageMin: number;
    ageMax: number;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const min = parseInt(e.currentTarget?.agemin?.value);
    const max = parseInt(e.currentTarget?.agemax?.value);
    if (!min || !max) {
      setMatchaNotif("Veuillez renseigner l'âge minimum et maximum");
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
    } else
      setBodyRequest({
        listingName,
        ageMin: min,
        ageMax: max,
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
        setListing(data.listing);
        console.log(data.listing);
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
        <input
          className='selected_filter_input'
          type='number'
          min={18}
          max={120}
          name='agemin'
          id='ageMin'
          placeholder='Minimum'
        />
        <input
          className='selected_filter_input'
          type='number'
          min={18}
          max={120}
          name='agemax'
          id='ageMax'
          placeholder='Maximum'
        />
        <input
          className='selected_filter_submit'
          type='submit'
          name='age_filter'
          id='age_filter'
          value='Filtrer'
        />
      </form>
    </>
  );
};

export default AgeFilter;
