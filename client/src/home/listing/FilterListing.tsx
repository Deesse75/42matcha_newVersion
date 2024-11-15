import { FC, useRef, useState } from 'react';
import AgeFilter from './AgeFilter';
import FameFilter from './FameFilter';
import Locationfilter from './Locationfilter';
import TagsFilter from './TagsFilter';

type Props = {
  listingName: string;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const FilterListing: FC<Props> = ({ listingName, setMatchaNotif }) => {
  const [filterSelected, setFilterSelected] = useState<string>('default');
  const refSelect = useRef<HTMLSelectElement>(null);

  return (
    <>
      <div className='listing_filter'>
        <div className='listing_filter_left'>
          <select
            onChange={(e) => {
              setFilterSelected(e.target.value);
            }}
            ref={refSelect}
            name='filter_select'
            id='filter_select'
          >
            <option defaultValue='default'>Filtrer par ...</option>
            <option value='age'>Age</option>
            <option value='location'>Location</option>
            <option value='fame'>Fame</option>
            <option value='tags'>Tags</option>
          </select>
        </div>

        <div className='listing_filter_right'>
          {filterSelected === 'default' && (
            <div className='listing_filter_empty'></div>
          )}
          {filterSelected === 'age' && (
            <AgeFilter
              listingName={listingName}
              setMatchaNotif={setMatchaNotif}
            />
          )}
          {filterSelected === 'location' && (
            <Locationfilter
              listingName={listingName}
              setMatchaNotif={setMatchaNotif}
            />
          )}
          {filterSelected === 'fame' && (
            <FameFilter
              listingName={listingName}
              setMatchaNotif={setMatchaNotif}
            />
          )}
          {filterSelected === 'tags' && (
            <TagsFilter
              listingName={listingName}
              setMatchaNotif={setMatchaNotif}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FilterListing;