import { FC } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import MiniProfile from '../../listing/components/MiniProfile';
import SearchSort from './SearchSort';

type Props = {
  listing: MiniProfileType[] | null;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchResult: FC<Props> = ({ listing, setMatchaNotif }) => {
  return (
    <>
      <div className='search_result_container'>
        <div className='search_result_header'>
          <SearchSort listing={listing} setMatchaNotif={setMatchaNotif} />
        </div>

        <div className='search_result_content'>
          {listing ? (
            <>
              {listing.map((profile, key) => (
                <MiniProfile
                  key={key as number}
                  profile={profile}
                  setMatchaNotif={setMatchaNotif}
                />
              ))}
            </>
          ) : (
            <>
              <div className='search_result_no_result'>Aucun profil</div>
            </>
          )}
        </div>

        <div className='search_result_footer'>
          <div className='search_result_footer_text'>
            {listing
              ? `${listing.length} profil(s) trouvé(s)`
              : `0 profil trouvé`}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
