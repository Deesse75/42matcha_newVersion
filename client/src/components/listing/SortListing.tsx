import { FC, useState, useEffect } from 'react';
import { ProfileFrontType } from '../../appConfig/interface';
import { useMemory } from '../../appContext/memory.context';
import { useUserInfo } from '../../appContext/user.context';
import { calculateDistance, communTags } from '../../utils/sort.utils';

type Props = {
  listing: ProfileFrontType[] | null;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SortListing: FC<Props> = ({ listing, setMatchaNotif }) => {
  const memo = useMemory();
  const me = useUserInfo();
  const [sortSelected, setSortSelected] = useState<string>('default');

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selected = e.currentTarget.sort.value;
    if (!selected || selected === 'default') {
      setMatchaNotif('Veuillez sélectionner un critère de tri');
      return;
    }
    setSortSelected(selected);
  };

  useEffect(() => {
    if (sortSelected === 'default') return;
    if (!listing) return;
    let sortListing: ProfileFrontType[] = [];
    if (sortSelected === 'ageUp')
      sortListing = listing.sort((a, b) => a.age - b.age);
    else if (sortSelected === 'ageDown')
      sortListing = listing.sort((a, b) => b.age - a.age);
    else if (sortSelected === 'fameRating')
      sortListing = listing.sort((a, b) => b.fameRating - a.fameRating);
    else if (sortSelected === 'location')
      sortListing = listing.sort(
        (a, b) => calculateDistance(a, me.user) - calculateDistance(b, me.user),
      );
    else if (sortSelected === 'tags')
      sortListing = listing.sort(
        (a, b) => communTags(a, me.userTags) - communTags(b, me.userTags),
      );
    memo.setListing(sortListing);
    sortListing = [];
  }, [sortSelected]);

  return (
    <>
      <div className='listing_sort_container'>
        <form onSubmit={handleClick} className='listing_sort_form'>
          <select name='sort' id='sort' className='listing_sort_select'>
            <option defaultValue='default'>Trier par ...</option>
            <option value='ageUp'>Age croissant</option>
            <option value='ageDown'>Age décroissant</option>
            <option value='fameRating'>Indice de popularité</option>
            <option value='location'>Proximité</option>
            <option value='tags'>Intêret en commun</option>
            <option value='reload'>Supprimer le tri</option>
          </select>
          <input
            className='listing_sort_submit'
            type='submit'
            name='sort_submit'
            id='sort_submit'
            value='Trier'
          />
        </form>
      </div>
    </>
  );
};

export default SortListing;
