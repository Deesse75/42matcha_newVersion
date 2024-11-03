import { FC, useEffect, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { appRedir, listingRoute } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import DashboardMatchEdit from './DashboardMatchEdit';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardChatMatch: FC<Props> = ({ setMatchaNotif }) => {
  const [errMess, setErrMess] = useState<string>('');
  const [listing, setListing] = useState<MiniProfileType[] | null>(null);
  const [currentListing, setCurrentListing] = useState<MiniProfileType[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!listing) return;
    setCurrentListing(listing);
    setListing(null);
  }, [listing]);

  useEffect(() => {
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getListing, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ listingName: 'match' }),
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
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          setErrMess('Erreur de chargement');
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
  }, []);

  return (
    <>
      <div className='dashboard_match_container'>
        <div className='dashboard_match_title'>Match</div>
        <div className="dasboard_match_users">
          {errMess ? (
            <>
              <div>{errMess}</div>
            </>
          ) : (
            <>

              {currentListing.length > 0 &&
                currentListing.map((profile, index) => (
                  <DashboardMatchEdit
                  profile={profile}
                  key={index as number}
                  setMatchaNotif={setMatchaNotif}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardChatMatch;
