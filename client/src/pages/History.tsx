import { FC, useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { appRedir, listingRoute } from '../appConfig/appPath';
import { ProfileFrontType } from '../appConfig/interface';
import DisplayListing from '../components/listing/DisplayListing';
import PageChargement from '../utils/chargement/PageChargement';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const HistoryPage: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [listing, setListing] = useState<ProfileFrontType[] | null>(null);
  const [listingName, setListingName] = useState<string | null>(null);
  const [reloadListing, setReloadListing] = useState<boolean>(false);
  const [displayListing, setDisplayListing] = useState<
    ProfileFrontType[] | null
  >(null);
  const [controlPage, setControlPage] = useState<boolean>(false);

  useEffect(() => {
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    setControlPage(true);
  }, []);

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

  useEffect(() => {
    if (!listing) return;
    setDisplayListing(listing);
    setListing(null);
  }, [listing]);

  return (
    <>
      {controlPage ? (
        <>
          <div className='history_container'>
            <div className='history_content'>
              <DisplayListing
                setMatchaNotif={setMatchaNotif}
                setListing={setListing}
                listing={displayListing}
                listingName={listingName}
              />
            </div>
            <div className='history_list'>
              <div className='history_list_row'>
                <div className='history_list_row_name'>Selection Matcha</div>
                <div
                  className='history_list_row_button'
                  onClick={() => {
                    setListingName('matcha');
                    setReloadListing(true);
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={25} />
                </div>
              </div>
              <div className='history_list_row'>
                <div className='history_list_row_name'>Match</div>
                <div
                  className='history_list_row_button'
                  onClick={() => {
                    setListingName('match');
                    setReloadListing(true);
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={25} />
                </div>
              </div>
              <div className='history_list_row'>
                <div className='history_list_row_name'>Likes reçues</div>
                <div
                  className='history_list_row_button'
                  onClick={() => {
                    setListingName('like');
                    setReloadListing(true);
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={25} />
                </div>
              </div>
              <div className='history_list_row'>
                <div className='history_list_row_name'>Visites reçues</div>
                <div
                  className='history_list_row_button'
                  onClick={() => {
                    setListingName('view');
                    setReloadListing(true);
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={25} />
                </div>
              </div>
              <div className='history_list_row'>
                <div className='history_list_row_name'>Profils likés</div>
                <div
                  className='history_list_row_button'
                  onClick={() => {
                    setListingName('liked');
                    setReloadListing(true);
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={25} />
                </div>
              </div>
              <div className='history_list_row'>
                <div className='history_list_row_name'>Profils visités</div>
                <div
                  className='history_list_row_button'
                  onClick={() => {
                    setListingName('visited');
                    setReloadListing(true);
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={25} />
                </div>
              </div>
              <div className='history_list_row'>
                <div className='history_list_row_name'>Profils bloqués</div>
                <div
                  className='history_list_row_button'
                  onClick={() => {
                    setListingName('banned');
                    setReloadListing(true);
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={25} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PageChargement />
        </>
      )}
    </>
  );
};

export default HistoryPage;
