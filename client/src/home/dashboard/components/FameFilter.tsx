import { FC, useEffect, useRef, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { appRedir, listingRoute } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  listingName: string;
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const FameFilter: FC<Props> = ({ listingName, setListing, setMatchaNotif }) => {
  const nav = useNavigate();
  const refFame = useRef<HTMLInputElement>(null);
  const [reqData, setReqData] = useState<{
    listingName: string;
    fameMin: number;
  } | null>(null);

  const handleClick = () => {
    setReqData({ 
      listingName: listingName,
      fameMin: refFame.current?.value ? parseInt(refFame.current.value) : 0 
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
      <div className='dashboard_filter_fame'>
          <input
          ref={refFame}
            type='number'
            min={0}
            name='fame'
            id='fame'
            placeholder='Supérieur à'
          />
          <input onClick={handleClick} type='button' name='' id='' value='Filtrer' />
      </div>
    </>
  );
};

export default FameFilter;
