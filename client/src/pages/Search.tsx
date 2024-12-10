import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../appConfig/appPath';
import { ProfileFrontType } from '../appConfig/interface';
import DisplayListing from '../components/listing/DisplayListing';
import SearchByLocation from '../components/search/SearchByLocation';
import SearchByTags from '../components/search/SearchByTags';
import SearchByUsername from '../components/search/SearchByUsername';
import SearchMulti from '../components/search/SearchMulti';
import PageChargement from '../utils/chargement/PageChargement';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchPage: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [listing, setListing] = useState<ProfileFrontType[] | null>(null);
  const [displayListing, setDisplayListing] = useState<
    ProfileFrontType[] | null
  >(null);
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [listingName, setListingName] = useState<string | null>(null);

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
    if (!listing) return;
    setDisplayListing(listing);
    setListing(null);
  }, [listing]);

  return (
    <>
      {controlPage ? (
        <>
          <div className='search_container'>
            <div className='search_content'>
              <DisplayListing
                setMatchaNotif={setMatchaNotif}
                setListing={setListing}
                listing={displayListing}
                listingName={listingName}
              />
            </div>
            <div className='search_request'>
              <div className='search_one_row'>
                <SearchByUsername
                  setMatchaNotif={setMatchaNotif}
                  setListing={setListing}
                  setListingName={setListingName}
                />
              </div>
              <div className='search_one_row'>
                <SearchByTags
                  setMatchaNotif={setMatchaNotif}
                  setListing={setListing}
                  setListingName={setListingName}
                />
              </div>
              <div className='search_one_col'>
                <SearchByLocation
                  setMatchaNotif={setMatchaNotif}
                  setListing={setListing}
                  setListingName={setListingName}
                />
              </div>
              <div className='search_multi_container'>
                <SearchMulti
                  setMatchaNotif={setMatchaNotif}
                  setListing={setListing}
                  setListingName={setListingName}
                />
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

export default SearchPage;
