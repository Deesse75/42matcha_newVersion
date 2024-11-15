import { FC, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useMemory } from "../../appContext/memory.context";
import { listingRoute, appRedir } from "../../appConfig/appPath";
import { useNavigate } from "react-router-dom";

type Props = {
  listingName: string;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ReinitListing: FC<Props> = ({ listingName, setMatchaNotif}) => {
  const [reloadListing, setReloadListing] = useState<boolean>(false);
  const memo = useMemory();
  const nav = useNavigate();

  useEffect(() => {
    if (!reloadListing) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getListing, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ listingName: listingName }),
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
        setReloadListing(false);
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
  }, [reloadListing]);

  return (
    <>
    <div className="reinit_listing_container">
      <div className="reinit_listing_icon" onClick={() => {setReloadListing(true)}}></div>
    </div>
    </>
  )
}