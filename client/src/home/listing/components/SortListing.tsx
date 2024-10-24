import { FC, useEffect, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { useUserInfo } from '../../../appContext/user.context';
import { calculateDistance, communTags } from '../../../utils/sort.utils';

type Props = {
  currentListing: MiniProfileType[];
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setListingName: React.Dispatch<React.SetStateAction<string | null>>;
};

const SortListing: FC<Props> = ({
  currentListing,
  setListing,
  setListingName,
}) => {
  const me = useUserInfo();
  const [sortSelected, setSortSelected] = useState<string>('default');

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSortSelected(e.currentTarget.sort.value);
  };

  useEffect(() => {
    if (sortSelected === 'default') return;
    let sortListing: MiniProfileType[] = [];
    if (sortSelected === 'ageUp')
      sortListing = currentListing.sort((a, b) => a.age - b.age);
    else if (sortSelected === 'ageDown')
      sortListing = currentListing.sort((a, b) => b.age - a.age);
    else if (sortSelected === 'fameRating')
      sortListing = currentListing.sort((a, b) => b.fameRating - a.fameRating);
    else if (sortSelected === 'location')
      sortListing = currentListing.sort(
        (a, b) => calculateDistance(a, me.user) - calculateDistance(b, me.user),
      );
    else if (sortSelected === 'tags')
      sortListing = currentListing.sort(
        (a, b) => communTags(a, me.user) - communTags(b, me.user),
      );
    else setListingName(me.historySelected);
    setListing(sortListing);
    sortListing = [];
  }, [sortSelected]);

  return (
    <>
      <div className='dashboard_sort'>
        <form onSubmit={handleClick} className='dashboard_sort_form'>
          <select name='sort' id='sort' className='dashboard_sort_select'>
            <option defaultValue='default'>Trier par ...</option>
            <option value='ageUp'>Age croissant</option>
            <option value='ageDown'>Age décroissant</option>
            <option value='fameRating'>Indice de popularité</option>
            <option value='location'>Proximité</option>
            <option value='tags'>Intêret en commun</option>
            <option value='reload'>Supprimer le tri</option>
          </select>
          <input
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
