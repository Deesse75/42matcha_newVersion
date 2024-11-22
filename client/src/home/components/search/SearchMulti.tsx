import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../../../appContext/memory.context';
import { searchRoute, appRedir } from '../../../appConfig/appPath';
import { UserLastSearchFrontType } from '../../../appConfig/interface';
import Cookies from 'js-cookie';  

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchMulti: FC<Props> = ({ setMatchaNotif }) => {
  const [lastSearch, setLastSearch] = useState<UserLastSearchFrontType | null>(
    null,
  );
  const [bodyRequest, setBodyRequest] =
    useState<UserLastSearchFrontType | null>(null);
  const nav = useNavigate();
  const memo = useMemory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //refaire cette fonction
    const ageMin = e?.currentTarget?.ageMin?.value;
    const ageMax = e?.currentTarget?.ageMax?.value;
    const gender = e?.currentTarget?.gender.value;
    const orientation = e?.currentTarget?.orientation.value;
    const tallMin = e?.currentTarget?.tallMin?.value;
    const tallMax = e?.currentTarget?.tallMax?.value;
    const withPhoto = e?.currentTarget?.withPhoto.checked;
    const withBio = e?.currentTarget?.withBio.checked;
    const fameRatingMin = e?.currentTarget?.fameRating?.value;

    if (
      !ageMin &&
      !ageMax &&
      gender === '---' &&
      orientation === '---' &&
      !tallMin &&
      !tallMax &&
      !withPhoto &&
      !withBio &&
      !fameRatingMin
    ) {
      setMatchaNotif('Veuillez remplir au moins un champ');
      return;
    }
    if (ageMin && (ageMin < 18 || ageMin > 120)) {
      setMatchaNotif("L'age minimale doit être compris entre 18 et 120 ans");
      return;
    }
    if (ageMax && (ageMax < 18 || ageMax > 120)) {
      setMatchaNotif("L'age maximum doit être compris entre 18 et 120 ans");
      return;
    }
    if (ageMin && ageMax && ageMin > ageMax) {
      setMatchaNotif("L'age minimun doit être inférieur à l'age maximum");
      return;
    }
    if (tallMin && (tallMin < 50 || tallMin > 250)) {
      setMatchaNotif(
        'La taille minimale doit être compris entre 50cm et 250cm',
      );
      return;
    }
    if (tallMax && (tallMax < 50 || tallMax > 250)) {
      setMatchaNotif('La taille maximum doit être compris entre 50cm et 250cm');
      return;
    }
    if (tallMin && tallMax && tallMin > tallMax) {
      setMatchaNotif(
        'La taille minimale doit être inférieure à la taille maximale',
      );
      return;
    }
    setBodyRequest({
      ageMin: ageMin ? parseInt(ageMin) : 18,
      ageMax: ageMax ? parseInt(ageMax) : 120,
      gender: gender === '---' ? null : gender,
      orientation: orientation === '---' ? null : orientation,
      tallMin: tallMin ? parseInt(tallMin) : 50,
      tallMax: tallMax ? parseInt(tallMax) : 250,
      withPhoto: withPhoto,
      withBio: withBio,
      fameRatingMin: fameRatingMin ? parseInt(fameRatingMin) : 0,
    });
  };

  useEffect(() => {
    if (lastSearch) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(searchRoute.getLastSearch, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
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
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setLastSearch(data.lastSearch);
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
  }, []);

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
      <form className='search_multi_form' onSubmit={handleSubmit}>
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
              type='submit'
              name='multiSubmit'
              id='multiSubmit'
              value='Rechercher'
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchMulti;
