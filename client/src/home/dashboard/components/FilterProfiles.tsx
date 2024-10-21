import { FC, useRef, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import AgeFilter from './AgeFilter';
import FameFilter from './FameFilter';
import Locationfilter from './Locationfilter';
import TagsFilter from './TagsFilter';

type Props = {
  listingName: string;
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const FilterProfiles: FC<Props> = ({
  listingName,
  setListing,
  setMatchaNotif,
}) => {
  const [filterChoice, setFilterChoice] = useState<string>('age');
  const refSelect = useRef<HTMLSelectElement>(null);
  return (
    <>
      <div className='matcha_filter'>
        <div className='matcha_filter_title'>Filtrer les profils par : </div>

        <div className='matcha_filter_part'>
          <div className='matcha_filter_part_left'>
            <select
              ref={refSelect}
              onChange={() => {
                setFilterChoice(refSelect!.current ? refSelect.current.value : 'age');
              }}
              name='filter_choice'
              id='filter_choice'
            >
              <option value='age'>Age</option>
              <option value='location'>Location</option>
              <option value='fame'>Fame</option>
              <option value='tags'>Tags</option>
            </select>
          </div>
          <div className='matcha_filter_part_right'>
            {filterChoice === 'age' && (
              <AgeFilter
                listingName={listingName}
                setListing={setListing}
                setMatchaNotif={setMatchaNotif}
              />
            )}
            {filterChoice === 'location' && (
              <Locationfilter
                listingName={listingName}
                setListing={setListing}
                setMatchaNotif={setMatchaNotif}
              />
            )}
            {filterChoice === 'fame' && (
              <FameFilter
                listingName={listingName}
                setListing={setListing}
                setMatchaNotif={setMatchaNotif}
              />
            )}
            {filterChoice === 'tags' && (
              <TagsFilter
                listingName={listingName}
                setListing={setListing}
                setMatchaNotif={setMatchaNotif}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProfiles;
