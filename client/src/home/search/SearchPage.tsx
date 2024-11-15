import { FC, useEffect, useState } from 'react';
import { appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../appContext/user.context';
import { useMemory } from '../../appContext/memory.context';
import { MiniProfileType } from '../../appConfig/interface';
import DisplayListing from '../listing/DisplayListing';
import SearchMulti from './components/SearchMulti';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchPage: FC<Props> = ({ setMatchaNotif }) => {
  const [searchListing, setSearchListing] = useState<MiniProfileType[] | null>(
    null,
  );
  const menu = useSelectMenu();
  const nav = useNavigate();
  const me = useUserInfo();
  const memo = useMemory();

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      menu.setAllMenuOff();
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session') || !me.user) {
      menu.setAllMenuOff();
      nav(appRedir.getMe);
      return;
    }
    menu.setOneMenuOn('search');
  }, []);

  useEffect(() => {
    if (!memo.listing) return;
    setSearchListing(memo.listing);
    memo.setListing(null);
  }, [memo.listing]);

  return (
    <>
      <div className='search_container'>
        <div className='search_multi_container'>
          <SearchMulti setMatchaNotif={setMatchaNotif} />
        </div>
        <div className='search_result_container'>
          <DisplayListing
            setMatchaNotif={setMatchaNotif}
            listing={searchListing}
            listingName='search'
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
