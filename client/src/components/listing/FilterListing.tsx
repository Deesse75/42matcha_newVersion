import { FC, useEffect, useRef, useState } from 'react';
import AgeFilter from './AgeFilter';
import FameFilter from './FameFilter';
import Locationfilter from './Locationfilter';
import TagsFilter from './TagsFilter';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  reinit: boolean;
  setReinit: React.Dispatch<React.SetStateAction<boolean>>;
  listingName: string | null;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const FilterListing: FC<Props> = ({
  reinit,
  setReinit,
  listingName,
  setListing,
  setMatchaNotif,
}) => {
  const [filterSelected, setFilterSelected] = useState<string>('default');
  const refSelect = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!reinit) return;
    setFilterSelected('default');
    setReinit(false);
  }, [reinit]);

  return (
    <>
      <div className='listing_filter_container'>
        {listingName && (
          <>
            <div className='listing_filter_left'>
              <select
                className='listing_filter_left_select'
                onChange={(e) => {
                  setFilterSelected(e.target.value);
                }}
                ref={refSelect}
                name='filter_select'
                id='filter_select'
              >
                <option defaultValue='default'>Filtrer par ...</option>
                <option value='age'>Tranche d'age</option>
                <option value='location'>Localisation</option>
                <option value='fame'>Note</option>
                <option value='tags'>Centre d'intêret</option>
              </select>
            </div>
            <div className='listing_filter_right'>
              {filterSelected === 'default' && (
                <div className='selected_filter_form'></div>
              )}
              {filterSelected === 'age' && (
                <AgeFilter
                  listingName={listingName}
                  setListing={setListing}
                  setMatchaNotif={setMatchaNotif}
                />
              )}
              {filterSelected === 'location' && (
                <Locationfilter
                  listingName={listingName}
                  setListing={setListing}
                  setMatchaNotif={setMatchaNotif}
                />
              )}
              {filterSelected === 'fame' && (
                <FameFilter
                  listingName={listingName}
                  setListing={setListing}
                  setMatchaNotif={setMatchaNotif}
                />
              )}
              {filterSelected === 'tags' && (
                <TagsFilter
                  listingName={listingName}
                  setListing={setListing}
                  setMatchaNotif={setMatchaNotif}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FilterListing;
