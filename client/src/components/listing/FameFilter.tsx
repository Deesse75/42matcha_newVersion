import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  listingName: string;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const FameFilter: FC<Props> = ({ listingName, setListing, setMatchaNotif }) => {
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    listingName: string;
    fameMin: number;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fameMin = e.currentTarget!.fame.value
      ? parseInt(e.currentTarget!.fame.value)
      : 0;
    if (fameMin <= 0) {
      setMatchaNotif("L'indice de popularité doit être supérieur à 0.");
      return;
    }
    if (!fameMin) {
      setMatchaNotif('Veuillez renseigner un indice de popularité.');
      return;
    }
    setBodyRequest({
      listingName,
      fameMin,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getFameFilter, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(bodyRequest),
        });
        const data = await response.json();
        console.log(response, data);
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
        <input
          className='selected_filter_input'
          type='number'
          min={0}
          required
          name='fame'
          id='fame'
          placeholder='Supérieur à'
        />
        <input
          className='selected_filter_submit'
          type='submit'
          name='fame_filter'
          id='fame_filter'
          value='Filtrer'
        />
      </form>
    </>
  );
};

export default FameFilter;
