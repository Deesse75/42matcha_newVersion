import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir, searchRoute } from '../appConfig/appPath';
import {
  ProfileFrontType,
  UserLastSearchFrontType,
} from '../appConfig/interface';
import { useMemory } from '../appContext/memory.context';
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
  const [listing, setListing] = useState<ProfileFrontType[] | null>(null);
  const memo = useMemory();
  const nav = useNavigate();
  const [reloadSearch, setReloadSearch] = useState<boolean>(false);
  const [controlPage, setControlPage] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<UserLastSearchFrontType | null>(
    null,
  );

  useEffect(() => {
    if (!Cookies.get('session')) {
      nav(appRedir.signout);
      return;
    }
    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    setReloadSearch(true);
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!reloadSearch) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(searchRoute.getLastSearch, {
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
        setReloadSearch(false);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setLastSearch(data.lastSearch);
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
  }, [reloadSearch]);

  useEffect(() => {
    if (!memo.listing) return;
    setListing(memo.listing);
    memo.setListing(null);
  }, [memo.listing]);

  return (
    <>
      {controlPage ? (
        <>
          <div className='search_container'>
            <div className='search_content'>
              <DisplayListing
                setMatchaNotif={setMatchaNotif}
                listing={listing}
                listingName={'search'}
              />
            </div>
            <div className='search_request'>
              <div className='search_one_container'>
                <SearchByUsername setMatchaNotif={setMatchaNotif} />
              </div>
              <div className='search_one_container'>
                <SearchByLocation setMatchaNotif={setMatchaNotif} />
              </div>
              <div className='search_one_container'>
                <SearchByTags setMatchaNotif={setMatchaNotif} />
              </div>
              <div className='search_multi_container'>
                <SearchMulti
                  setMatchaNotif={setMatchaNotif}
                  lastSearch={lastSearch}
                  setReloadSearch={setReloadSearch}
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
