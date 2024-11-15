import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { appRedir, chatRoute } from '../../../appConfig/appPath';
import MicroMatchDisplay from './MicroMatchDisplay';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  openMicroMatch: boolean;
  setOpenMicroMatch: React.Dispatch<React.SetStateAction<boolean>>;
};

const MicroMatchList: FC<Props> = ({
  setMatchaNotif,
  openMicroMatch,
  setOpenMicroMatch,
}) => {
  const [reloadListing, setReloadListing] = useState<boolean>(false);
  const [listing, setListing] = useState<
    { id: number; username: string }[] | null
  >(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!openMicroMatch) return;
    setReloadListing(true);
  }, [openMicroMatch]);

  useEffect(() => {
    if (!reloadListing) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(chatRoute.getMicroMatchList, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
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
          return;
        }
        setListing(data.listing);
        setReloadListing(false);
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
      <div className='chat_section'>
        <div className='chat_micro_match_content'>
          {openMicroMatch && (
            <>
              {listing ? (
                listing.map((profile, index) => (
                  <MicroMatchDisplay
                    profile={profile}
                    key={index as number}
                    setOpenMicroMatch={setOpenMicroMatch}
                  />
                ))
              ) : (
                <>
                  <div className='matcha_empty'>Auncun match</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MicroMatchList;
