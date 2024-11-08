import { FC, useEffect, useState } from 'react';
import { appRedir, searchRoute } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../appContext/user.context';
import { SearchAdvanceRequestType } from '../../../appConfig/interface';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchAgeFilter: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [bodyRequest, setBodyRequest] = useState<{
    searchRequest: SearchAdvanceRequestType;
    ageMin: number;
    ageMax: number;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const min = e.currentTarget.agemin.value;
    const max = e.currentTarget.agemax.value;
    if (!me.searchRequest) {
      setMatchaNotif('Veuillez effectuer une recherche');
      return;
    }
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
    setBodyRequest({
      searchRequest: me.searchRequest,
      ageMin: min ? parseInt(min) : 18,
      ageMax: max ? parseInt(max) : 120,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(searchRoute.searchAgeFilter, {
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
        me.setSearchResult(data.listing);
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

export default SearchAgeFilter;
