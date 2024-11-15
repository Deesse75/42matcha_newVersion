import { FC } from 'react';
import SearchSimple from './SearchSimple';
import SearchAdvanced from './SearchAdvanced';

type Props = {
  simple: boolean;
  setSimple: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchRequest: FC<Props> = ({ simple, setSimple, setMatchaNotif }) => {

  return (
    <>
      <div className='search_request_container'>
        <div className='search_request_select'>
          {simple ? (
            <>
              <div
                onClick={() => {
                  setSimple(false);
                }}
                className='search_request_select_text'
              >
                Recherche avancée
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  setSimple(true);
                }}
                className='search_request_select_text'
              >
                Recherche simple
              </div>
            </>
          )}
        </div>
        {simple ? (
          <>
            <SearchSimple setMatchaNotif={setMatchaNotif} />
          </>
        ) : (
          <>
            {' '}
            <SearchAdvanced setMatchaNotif={setMatchaNotif} />
          </>
        )}
      </div>
    </>
  );
};

export default SearchRequest;
