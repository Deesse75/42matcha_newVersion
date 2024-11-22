import { FC, useEffect, useState } from 'react';
import { appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import { useNavigate } from 'react-router-dom';
import { ProfileFrontType } from '../../appConfig/interface';
import SearchByUsername from '../components/search/SearchByUsername';
import SearchByLocation from '../components/search/SearchByLocation';
import SearchByTags from '../components/search/SearchByTags';
import SearchMulti from '../components/search/SearchMulti';
import DisplayListing from '../components/listing/DisplayListing';
import { useMemory } from '../../appContext/memory.context';
import WaitChargement from '../../utils/WaitChargement'; 
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchPage: FC<Props> = ({ setMatchaNotif }) => {
  const [listing, setListing] = useState<ProfileFrontType[] | null>(null);
  const menu = useSelectMenu();
  const memo = useMemory();
  const nav = useNavigate();
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
    menu.setDisplayAppMenu(true);
    menu.setAllMenuOff();
    setControlPage(true);
  }, []);

  useEffect(() => {
    if (!controlPage) return;
    menu.setOneMenuOn('search');
  }, [controlPage]);

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
              <div className='search_one_container'>
                <SearchMulti setMatchaNotif={setMatchaNotif} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default SearchPage;
