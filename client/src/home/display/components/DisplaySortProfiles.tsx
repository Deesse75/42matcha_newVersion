import { FC, useEffect, useState } from 'react';
import { MediumProfileType } from '../../../appContext/memory.interface';

type Props = {
  listing: MediumProfileType[] | null;
};

const DisplaySortProfiles: FC<Props> = ({ listing }) => {
  const [ageChecked, setAgeChecked] = useState<boolean>(false);
  const [locationChecked, setLocationChecked] = useState<boolean>(false);
  const [tagsChecked, setTagsChecked] = useState<boolean>(false);
  const [fameChecked, setFameChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!ageChecked) return;
    if (listing) {
      listing.sort((a, b) => a.age - b.age);
    }
    setFameChecked(false);
    setLocationChecked(false);
    setTagsChecked(false);
  }, [ageChecked]);

  useEffect(() => {
    if (!locationChecked) return;
    if (listing) {
      console.log('locationChecked a implementer');
    }
    setFameChecked(false);
    setAgeChecked(false);
    setTagsChecked(false);
  }, [locationChecked]);

  useEffect(() => {
    if (!tagsChecked) return;
    if (listing) {
      console.log('tagsChecked a implementer');
    }
    setFameChecked(false);
    setAgeChecked(false);
    setLocationChecked(false);
  }, [tagsChecked]);

  useEffect(() => {
    if (!fameChecked) return;
    if (listing) {
      listing.sort((a, b) => b.fameRating - a.fameRating);
    }
    setTagsChecked(false);
    setAgeChecked(false);
    setLocationChecked(false);
  }, [fameChecked]);

  return (
    <>
      <div className='matcha_sort'>
        <div className='matcha_sort_title'>Trier par : </div>
        <div className='matcha_sort_option'>
          <div className='matcha_sort_option_part'>
            <label htmlFor='sort_age'>Age</label>
            <input
              onChange={() => {
                setAgeChecked(!ageChecked);
              }}
              type='checkbox'
              name='sort_age'
              id='sort_age'
              checked={ageChecked}
            />
          </div>
          <div className='matcha_sort_option_part'>
            <label htmlFor='sort_location'>Proximité</label>
            <input
              onChange={() => {setLocationChecked(!locationChecked)}}
              type='checkbox'
              name='sort_location'
              id='sort_location'
              checked={locationChecked}
            />
          </div>
          <div className='matcha_sort_option_part'>
            <label htmlFor='sort_fame'>Indice de popularité</label>
            <input
              onChange={() => {setFameChecked(!fameChecked)}}
              type='checkbox'
              name='sort_fame'
              id='sort_fame'
              checked={fameChecked}
            />
          </div>
          <div className='matcha_sort_option_part'>
            <label htmlFor='sort_tags'>Tags en commun</label>
            <input
              onChange={() => {setTagsChecked(!tagsChecked)}}
              type='checkbox'
              name='sort_tags'
              id='sort_tags'
              checked={tagsChecked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplaySortProfiles;
