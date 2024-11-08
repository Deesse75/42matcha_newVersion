import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, listingRoute } from '../../appConfig/appPath';
import { MiniProfileType } from '../../appConfig/interface';
import MiniProfile from './components/MiniProfile';
import Cookies from 'js-cookie';
import SortListing from './components/SortListing';
import FilterListing from './components/FilterListing';
import { useUserInfo } from '../../appContext/user.context';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ListingPage: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [listing, setListing] = useState<MiniProfileType[] | null>(null);
  const [currentListing, setCurrentListing] = useState<MiniProfileType[]>([]);
  const [listingName, setListingName] = useState<string | null>(null);
  const [reqData, setReqData] = useState<{ listingName: string } | null>(null);

  useEffect(() => {
    if (!Cookies.get('session') || !Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    setListingName(me.historySelected);
  }, []);

  useEffect(() => {
    if (!listingName) return;
    setReqData({ listingName: listingName });
    setListingName(null);
  }, [listingName]);

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getListing, {
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
          setListing(null);
          setMatchaNotif(data.message);
          return;
        }
        if (!data.listing) setListing([]);
        else setListing(data.listing);
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

  useEffect(() => {
    if (!listing) return;
    setCurrentListing(listing);
    setListing(null);
  }, [listing]);

  return (
    <>
      <div className='listing_container'>

        <div
          className={
            currentListing.length ? 'listing_header_on' : 'listing_header_off'
          }
        >
          <SortListing
            currentListing={currentListing}
            setListing={setListing}
            setMatchaNotif={setMatchaNotif}
          />
          <FilterListing
            setListing={setListing}
            setMatchaNotif={setMatchaNotif}
          />
        </div>

        <div
          className={
            currentListing.length ? 'listing_content_on' : 'listing_content_off'
          }
        >
          {currentListing.length && (
            <>
              {currentListing.map((profile, key) => (
                <MiniProfile
                  key={key as number}
                  profile={profile}
                  setMatchaNotif={setMatchaNotif}
                />
              ))}
            </>
          )}
        </div>

        <div className='listing_footer'>
          <div className='listing_footer_text'>
            {`${currentListing.length} profil(s) trouvé(s)`}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingPage;
