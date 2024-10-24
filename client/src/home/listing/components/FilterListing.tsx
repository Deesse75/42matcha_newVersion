import { FC, useRef, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import AgeFilter from './AgeFilter';
import FameFilter from './FameFilter';
import Locationfilter from './Locationfilter';
import TagsFilter from './TagsFilter';

type Props = {
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const FilterListing: FC<Props> = ({
  setListing,
  setMatchaNotif,
}) => {
  const [filterSelected, setFilterSelected] = useState<string>('default');
  const refSelect = useRef<HTMLSelectElement>(null);
  return (
    <>
      <div className='dashboard_filter'>
        <div className='dashboard_filter_left'>
          <select onChange={(e) => {setFilterSelected(e.target.value)}} ref={refSelect} name='filter_select' id='filter_select'>
            <option defaultValue='default'>Filtrer par ...</option>
            <option value='age'>Age</option>
            <option value='location'>Location</option>
            <option value='fame'>Fame</option>
            <option value='tags'>Tags</option>
            <option value='reload'>Supprimer le filtre</option>
          </select>
        </div>

        <div className='dashboard_filter_right'>
          {(filterSelected === 'default' || filterSelected === 'reload') && (
            <div className='dashboard_filter_empty'></div>
          )}
          {filterSelected === 'age' && (
            <AgeFilter
              setListing={setListing}
              setMatchaNotif={setMatchaNotif}
            />
          )}
          {filterSelected === 'location' && (
            <Locationfilter
              setListing={setListing}
              setMatchaNotif={setMatchaNotif}
            />
          )}
          {filterSelected === 'fame' && (
            <FameFilter
              setListing={setListing}
              setMatchaNotif={setMatchaNotif}
            />
          )}
          {filterSelected === 'tags' && (
            <TagsFilter
              setListing={setListing}
              setMatchaNotif={setMatchaNotif}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FilterListing;
