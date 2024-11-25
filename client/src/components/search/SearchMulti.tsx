import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../../appContext/memory.context';
import { searchRoute, appRedir } from '../../appConfig/appPath';
import { UserLastSearchFrontType } from '../../appConfig/interface';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  lastSearch: UserLastSearchFrontType | null;
  setReloadSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchMulti: FC<Props> = ({
  setMatchaNotif,
  lastSearch,
  setReloadSearch,
}) => {
  const refAgeMin = useRef<HTMLInputElement>(null);
  const refAgeMax = useRef<HTMLInputElement>(null);
  const refGender = useRef<HTMLSelectElement>(null);
  const refOrientation = useRef<HTMLSelectElement>(null);
  const refTallMin = useRef<HTMLInputElement>(null);
  const refTallMax = useRef<HTMLInputElement>(null);
  const refWithPhoto = useRef<HTMLInputElement>(null);
  const refWithBio = useRef<HTMLInputElement>(null);
  const refFameRating = useRef<HTMLInputElement>(null);
  const [bodyRequest, setBodyRequest] =
    useState<UserLastSearchFrontType | null>(null);
  const nav = useNavigate();
  const memo = useMemory();

  const handleSubmit = () => {
    const newLastSearch: UserLastSearchFrontType = {
      ageMin: refAgeMin.current ? parseInt(refAgeMin.current.value) : 18,
      ageMax: refAgeMax.current ? parseInt(refAgeMax.current.value) : 120,
      gender: refGender.current ? refGender.current.value : null,
      orientation: refOrientation.current ? refOrientation.current.value : null,
      tallMin: refTallMin.current ? parseInt(refTallMin.current.value) : 0,
      tallMax: refTallMax.current ? parseInt(refTallMax.current.value) : 250,
      withPhoto: refWithPhoto.current ? refWithPhoto.current.checked : false,
      withBio: refWithBio.current ? refWithBio.current.checked : false,
      fameRatingMin: refFameRating.current
        ? parseInt(refFameRating.current.value)
        : 0,
    };

    if (lastSearch === newLastSearch) {
      setMatchaNotif('Veuillez remplir au moins un champ');
      return;
    }
    if (
      newLastSearch.ageMin &&
      (newLastSearch.ageMin < 18 || newLastSearch.ageMin > 120)
    ) {
      setMatchaNotif("L'age minimale doit être compris entre 18 et 120 ans");
      return;
    }
    if (
      newLastSearch.ageMax &&
      (newLastSearch.ageMax < 18 || newLastSearch.ageMax > 120)
    ) {
      setMatchaNotif("L'age maximum doit être compris entre 18 et 120 ans");
      return;
    }
    if (
      newLastSearch.ageMin &&
      newLastSearch.ageMax &&
      newLastSearch.ageMin > newLastSearch.ageMax
    ) {
      setMatchaNotif("L'age minimun doit être inférieur à l'age maximum");
      return;
    }
    if (
      newLastSearch.tallMin &&
      (newLastSearch.tallMin < 50 || newLastSearch.tallMin > 250)
    ) {
      setMatchaNotif(
        'La taille minimale doit être compris entre 50cm et 250cm',
      );
      return;
    }
    if (
      newLastSearch.tallMax &&
      (newLastSearch.tallMax < 50 || newLastSearch.tallMax > 250)
    ) {
      setMatchaNotif('La taille maximum doit être compris entre 50cm et 250cm');
      return;
    }
    if (
      newLastSearch.tallMin &&
      newLastSearch.tallMax &&
      newLastSearch.tallMin > newLastSearch.tallMax
    ) {
      setMatchaNotif(
        'La taille minimale doit être inférieure à la taille maximale',
      );
      return;
    }
    setBodyRequest(newLastSearch);
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(searchRoute.searchMulti, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(bodyRequest),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setBodyRequest(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        memo.setListing(data.listing);
        setReloadSearch(true);
      } catch (error) {
        if (!isMounted) return;
        setMatchaNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [bodyRequest]);

  return (
    <>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Age entre</div>
        <div className='search_multi_value'>
          <input
            type='number'
            name='ageMin'
            id='ageMin'
            value={lastSearch?.ageMin ?? 18}
          />
          <input
            type='number'
            name='ageMax'
            id='ageMax'
            value={lastSearch?.ageMax ?? 120}
          />
        </div>
      </div>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Taille entre</div>
        <div className='search_multi_value'>
          <input
            type='number'
            name='tallMin'
            id='tallMin'
            value={lastSearch?.tallMin ?? 0}
          />
          <input
            type='number'
            name='tallMax'
            id='tallMax'
            value={lastSearch?.tallMax ?? 250}
          />
        </div>
      </div>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Genre</div>
        <div className='search_multi_value'>
          <select className='' name='gender' id='gender'>
            <option defaultValue='default'>{lastSearch?.gender ?? ''}</option>
            <option value='Homme'>Homme</option>
            <option value='Femme'>Femme</option>
            <option value='Non-binaire'>Non-binaire</option>
            <option value='Agenre'>Agenre</option>
            <option value='Bigenre'>Bigenre</option>
            <option value='Genre fluide'>Genre fluide</option>
            <option value='Femme transgenre'>Femme transgenre</option>
            <option value='Homme transgenre'>Homme transgenre</option>
            <option value='Pangenre'>Pangenre</option>
            <option value='Autre'>Autre</option>
          </select>
        </div>
      </div>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Orientation sexuelle</div>
        <div className='search_multi_value'>
          <select className='' name='orientation' id='orientation'>
            <option defaultValue='default'>
              {lastSearch?.orientation ?? ''}
            </option>
            <option value='Homme'>Hétérosexuel(le)</option>
            <option value='Femme'>Homosexuel(le)</option>
            <option value='Bisexuel'>Bisexuel(le)</option>
            <option value='Pansexuel'>Pansexuel(le)</option>
            <option value='Asexuel'>Asexuel(le)</option>
            <option value='Demisexuel'>Demisexuel(le)</option>
            <option value='Sapiosexuel'>Sapiosexuel(le)</option>
            <option value='Polysexuel'>Polysexuel(le)</option>
            <option value='Queer'>Queer</option>
            <option value='Skoliosexuel'>Skoliosexuel(le)</option>
            <option value='Graysexuel'>Graysexuel(le)</option>
            <option value='Autre'>Autre</option>
          </select>
        </div>
      </div>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Note supérieure à</div>
        <div className='search_multi_value'>
          <input
            type='number'
            name='fameMin'
            id='fameMin'
            value={lastSearch?.fameRatingMin ?? 0}
          />
        </div>
      </div>
      <div className='search_multi_row'>
        <label htmlFor='withPhoto'>Avec photo</label>
        <input
          type='checkbox'
          name='withPhoto'
          id='withPhoto'
          checked={lastSearch?.withPhoto ?? false}
        />
        <label htmlFor='withBio'>Avec annonce</label>
        <input
          type='checkbox'
          name='withBio'
          id='withBio'
          checked={lastSearch?.withBio ?? false}
        />
      </div>

      <div className='search_multi_bottom'>
        <div className='search_multi_submit'>
          <input
            className='search_multi_submit_button'
            onClick={handleSubmit}
            type='submit'
            name='multiSubmit'
            id='multiSubmit'
            value='Rechercher'
          />
        </div>
      </div>
    </>
  );
};

export default SearchMulti;
