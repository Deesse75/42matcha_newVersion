import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { IoReload } from 'react-icons/io5';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  listingName: string | null;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReinit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReinitListing: FC<Props> = ({
  listingName,
  setListing,
  setMatchaNotif,
  setReinit,
}) => {
  const [reloadListing, setReloadListing] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!reloadListing) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${listingRoute.getListing}/${listingName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('session')}`,
            },
          },
        );
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
        setReloadListing(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setListing(data.listing);
        setReinit(true);
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
  }, [reloadListing]);

  return (
    <>
      <div className='listing_reinit'>
        {listingName && (
          <>
            <button
              className='listing_reinit_icon'
              onClick={() => {
                setReloadListing(true);
              }}
            >
              <IoReload size={25} />
            </button>
          </>
        )}
      </div>
    </>
  );
};
