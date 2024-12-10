import { FC, useState, useEffect, useRef } from 'react';
import { ProfileFrontType } from '../../appConfig/interface';
import { useUserInfo } from '../../appContext/user.context';
import { calculateDistance, communTags } from '../../utils/sort.utils';

type Props = {
  listing: ProfileFrontType[] | null;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  reinit: boolean;
  setReinit: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SortListing: FC<Props> = ({
  listing,
  setListing,
  reinit,
  setReinit,
  setMatchaNotif,
}) => {
  const me = useUserInfo();
  const refSort = useRef<HTMLSelectElement>(null);
  const [sortSelected, setSortSelected] = useState<string>('default');

  const handleSubmit = () => {
    const selected = refSort.current?.value ?? null;
    if (!selected || selected === 'default') {
      setMatchaNotif('Veuillez sélectionner un critère de tri');
      return;
    }
    setSortSelected(selected);
  };

  useEffect(() => {
    if (!reinit) return;
    setSortSelected('default');
    refSort.current!.value = 'Trier par ...';
    setReinit(false);
  }, [reinit]);

  useEffect(() => {
    if (sortSelected === 'default') return;
    if (!listing || listing.length === 1) return;
    let sortListing: ProfileFrontType[] = [];
    if (sortSelected === 'ageUp')
      sortListing = listing.sort((a, b) => a.age - b.age);
    else if (sortSelected === 'ageDown')
      sortListing = listing.sort((a, b) => b.age - a.age);
    else if (sortSelected === 'fameRating')
      sortListing = listing.sort((a, b) => b.fameRating - a.fameRating);
    else if (sortSelected === 'location')
      sortListing = listing.sort(
        (a, b) => calculateDistance(b, me.user) - calculateDistance(a, me.user),
      );
    else if (sortSelected === 'tags')
      sortListing = listing.sort(
        (a, b) => communTags(a, me.userTags) - communTags(b, me.userTags),
      );
    setListing(sortListing);
  }, [sortSelected]);

  return (
    <>
      <div className='listing_sort_container'>
        <select
          name='sort'
          id='sort'
          className='listing_sort_select'
          ref={refSort}
        >
          <option defaultValue='default'>Trier par ...</option>
          <option value='ageUp'>Age croissant</option>
          <option value='ageDown'>Age décroissant</option>
          <option value='fameRating'>Note</option>
          <option value='location'>Proximité</option>
          <option value='tags'>Intêret en commun</option>
        </select>
        <input
          className='listing_sort_submit'
          onClick={handleSubmit}
          type='submit'
          name='sort_submit'
          id='sort_submit'
          value='Trier'
        />
      </div>
    </>
  );
};

export default SortListing;
