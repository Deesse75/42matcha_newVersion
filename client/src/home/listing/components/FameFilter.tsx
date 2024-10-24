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

const FameFilter: FC<Props> = ({ setListing, setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [reqData, setReqData] = useState<{
    listingName: string;
    fameMin: number;
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fameMin = parseInt(e.currentTarget!.fame.value) || 0;
    if (fameMin <= 0) {
      setMatchaNotif("L'indice de popularité doit être supérieur à 0.");
      return;
    }
    if (!me.historySelected) setMatchaNotif('Requête invalide.');
    else
      setReqData({
        listingName: me.historySelected,
        fameMin: fameMin,
      });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getFameFilter, {
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
            min={0}
            required
            name='fame'
            id='fame'
            placeholder='Indice supérieur à'
          />
          <input
            type='submit'
            name='fame_filter'
            id='fame_filter'
            value='Filtrer'
          />
        </form>
      </div>
    </>
  );
};

export default FameFilter;
