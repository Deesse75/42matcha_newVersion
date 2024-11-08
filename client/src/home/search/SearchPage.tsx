import { FC, useEffect, useState } from 'react';
import { useUserInfo } from '../../appContext/user.context';
import SearchRequest from './components/SearchRequest';
import SearchResult from './components/SearchResult';
import { MiniProfileType } from '../../appConfig/interface';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchPage: FC<Props> = ({ setMatchaNotif }) => {
  const [simple, setSimple] = useState<boolean>(true);
  const [listing, setListing] = useState<MiniProfileType[] | null>(null);
  const me = useUserInfo();

  useEffect(() => {
    if (!me.searchResult) return;
    setListing(me.searchResult);
    me.setSearchResult(null);
  }, [me.searchResult]);

  return (
    <>
      <div className='search_container'>
        <SearchResult
          listing={listing}
          setMatchaNotif={setMatchaNotif}
        />
        <SearchRequest
          simple={simple}
          setSimple={setSimple}
          setMatchaNotif={setMatchaNotif}
        />
      </div>
    </>
  );
};

export default SearchPage;
