import { FC, useRef, useState } from 'react';
import { MediumProfileType } from '../../../appConfig/interface';
import * as matchaFilter from '../../../utils/filterFunctions';

type Props = {
  listing: MediumProfileType[] | null;
  setListing: React.Dispatch<React.SetStateAction<MediumProfileType[] | null>>;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayFilterProfiles: FC<Props> = ({
  listing,
  setListing,
  setSystemNotif,
}) => {
  const refAgeMin = useRef<HTMLInputElement>(null);
  const refAgeMax = useRef<HTMLInputElement>(null);
  const refLocation = useRef<HTMLSelectElement>(null);
  const refTags = useRef<HTMLInputElement>(null);
  const refFame = useRef<HTMLInputElement>(null);
  const [geoloc, setGeoloc] = useState<boolean>(true);

  const handleClick = () => {
    if (!listing) return;

    let filterList: MediumProfileType[] | null = listing;
    if (refAgeMin.current && refAgeMax.current) {
      filterList = matchaFilter.byAge(
        parseInt(refAgeMin.current.value),
        parseInt(refAgeMax.current.value),
        filterList,
      );
      if (!filterList) {
        if (
          parseInt(refAgeMin.current.value) > parseInt(refAgeMax.current.value)
        ) {
          setSystemNotif("L'âge minimum doit être inférieur à l'âge maximum.");
          return;
        }
        setListing(null);
        return;
      }
    }

    if (refFame.current) {
      filterList = matchaFilter.byFameFilter(parseInt(refFame.current.value), filterList);
      if (!filterList) {
        setListing(null);
        return;
      }
    };

    if (geoloc && refLocation.current && refLocation.current.value !== '---') {
      setSystemNotif('Veuillez préciser le type de localisation.');
      return;
    }
    if (refLocation.current && refLocation.current.value !== '---') {
      filterList = matchaFilter.byLocation(refLocation.current.value, geoloc, filterList);
      if (!filterList) {
        setListing(null);
        return;
      }
    }
    setListing(filterList);
  };

  return (
    <>
      <div className='matcha_sort_title'>Trier par : </div>
      <div className='matcha_sort_section'>
        <div className='matcha_sort_section_option'>
          <div>age</div>
          <input
            ref={refAgeMin}
            type='number'
            name='sort_age_min'
            id='sort_age_min'
            placeholder='age minimum'
            defaultValue={18}
          />
          <input
            ref={refAgeMax}
            type='number'
            name='sort_age_max'
            id='sort_age_max'
            placeholder='age maximum'
            defaultValue={120}
          />
        </div>

        <div className='matcha_sort_section_option'>
          <div>Utiliser votre géolocalisaton</div>
          <input
            onChange={() => {
              setGeoloc(!geoloc);
            }}
            type='checkbox'
            name='sort_geoloc'
            id='sort_geoloc'
            checked={!geoloc}
          />
          <select ref={refLocation} name='sort_location' id='sort_location'>
            <option defaultValue='null'>---</option>
            <option value='town'>Ville</option>
            <option value='county'>Département</option>
            <option value='region'>Région</option>
          </select>
        </div>

        <div className='matcha_sort_section_option'>
          <div>Tags en commun</div>
          <input
            ref={refTags}
            type='checkbox'
            name='sort_tags'
            id='sort_tags'
          />
        </div>

        <div className='matcha_sort_section_option'>
          <div>Popularité</div>
          <input
            ref={refFame}
            type='checkbox'
            name='sort_fame'
            id='sort_fame'
            defaultValue={0}
            placeholder='supérieur ou égal à'
          />
        </div>

        <div className='matcha_sort_section_submit'>
          <button
            onClick={() => {
              handleClick;
            }}
          >
            Trier
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayFilterProfiles;
