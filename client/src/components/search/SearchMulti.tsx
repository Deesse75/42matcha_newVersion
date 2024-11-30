import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { ProfileFrontType } from '../../appConfig/interface';

type BodyRequestType = {
  ageMin: number | null;
  ageMax: number | null;
  gender: string | null;
  orientation: string | null;
  tallMin: number | null;
  tallMax: number | null;
  withPhoto: boolean;
  withBio: boolean;
  fameRatingMin: number | null;
};

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setListingName: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchMulti: FC<Props> = ({
  setMatchaNotif,
  setListing,
  setListingName,
}) => {
  const refAgeMin = useRef<HTMLInputElement>(null);
  const refAgeMax = useRef<HTMLInputElement>(null);
  const refGender = useRef<HTMLSelectElement>(null);
  const refOrientation = useRef<HTMLSelectElement>(null);
  const refTallMin = useRef<HTMLInputElement>(null);
  const refTallMax = useRef<HTMLInputElement>(null);
  const refFameRating = useRef<HTMLInputElement>(null);
  const [withPhoto, setWithPhoto] = useState<boolean>(false);
  const [withBio, setWithBio] = useState<boolean>(false);
  const [bodyRequest, setBodyRequest] = useState<BodyRequestType | null>(null);
  const nav = useNavigate();

  const handleSubmit = () => {
    const searchRequest: BodyRequestType = {
      ageMin: refAgeMin.current ? parseInt(refAgeMin.current.value) : null,
      ageMax: refAgeMax.current ? parseInt(refAgeMax.current.value) : null,
      gender: refGender.current ? refGender.current.value : null,
      orientation: refOrientation.current ? refOrientation.current.value : null,
      tallMin: refTallMin.current ? parseInt(refTallMin.current.value) : null,
      tallMax: refTallMax.current ? parseInt(refTallMax.current.value) : null,
      withPhoto: withPhoto,
      withBio: withBio,
      fameRatingMin: refFameRating.current
        ? parseInt(refFameRating.current.value)
        : null,
    };
    if (
      !searchRequest.ageMin &&
      !searchRequest.ageMax &&
      !searchRequest.gender &&
      !searchRequest.orientation &&
      !searchRequest.tallMin &&
      !searchRequest.tallMax &&
      !searchRequest.fameRatingMin &&
      !searchRequest.withPhoto &&
      !searchRequest.withBio
    ) {
      setMatchaNotif('Entrez au moins un critère de recherche');
      return;
    }
    if (
      searchRequest.ageMin &&
      (searchRequest.ageMin < 18 || searchRequest.ageMin > 120)
    ) {
      setMatchaNotif("L'age minimale doit être compris entre 18 et 120 ans");
      return;
    }
    if (
      searchRequest.ageMax &&
      (searchRequest.ageMax < 18 || searchRequest.ageMax > 120)
    ) {
      setMatchaNotif("L'age maximum doit être compris entre 18 et 120 ans");
      return;
    }
    if (
      searchRequest.ageMin &&
      searchRequest.ageMax &&
      searchRequest.ageMin > searchRequest.ageMax
    ) {
      setMatchaNotif("L'age minimun doit être inférieur à l'age maximum");
      return;
    }
    if (
      searchRequest.tallMin &&
      (searchRequest.tallMin < 50 || searchRequest.tallMin > 250)
    ) {
      setMatchaNotif(
        'La taille minimale doit être compris entre 50cm et 250cm',
      );
      return;
    }
    if (
      searchRequest.tallMax &&
      (searchRequest.tallMax < 50 || searchRequest.tallMax > 250)
    ) {
      setMatchaNotif('La taille maximum doit être compris entre 50cm et 250cm');
      return;
    }
    if (
      searchRequest.tallMin &&
      searchRequest.tallMax &&
      searchRequest.tallMin > searchRequest.tallMax
    ) {
      setMatchaNotif(
        'La taille minimale doit être inférieure à la taille maximale',
      );
      return;
    }
    if (searchRequest.fameRatingMin && searchRequest.fameRatingMin < 0) {
      setMatchaNotif('La note minimale doit être supérieure ou égale à 0');
      return;
    }
    setBodyRequest({
      ageMin: searchRequest.ageMin,
      ageMax: searchRequest.ageMax,
      gender: searchRequest.gender === '---' ? null : searchRequest.gender,
      orientation:
        searchRequest.orientation === '---' ? null : searchRequest.orientation,
      tallMin: searchRequest.tallMin,
      tallMax: searchRequest.tallMax,
      withPhoto: searchRequest.withPhoto,
      withBio: searchRequest.withBio,
      fameRatingMin: searchRequest.fameRatingMin,
    });
  };

  const handleClear = () => {
    if (refAgeMin.current) refAgeMin.current.value = '';
    if (refAgeMax.current) refAgeMax.current.value = '';
    if (refGender.current) refGender.current.value = '---';
    if (refOrientation.current) refOrientation.current.value = '---';
    if (refTallMin.current) refTallMin.current.value = '';
    if (refTallMax.current) refTallMax.current.value = '';
    if (refFameRating.current) refFameRating.current.value = '';
    setWithPhoto(false);
    setWithBio(false);
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
        setListing(data.listing);
        setListingName('search');
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
            className='search_multi_value_num'
            type='number'
            name='ageMin'
            id='ageMin'
            min={18}
            max={120}
            autoComplete='number'
            ref={refAgeMin}
          />
          <input
            className='search_multi_value_num'
            type='number'
            name='ageMax'
            id='ageMax'
            min={18}
            max={120}
            autoComplete='number'
            ref={refAgeMax}
          />
        </div>
      </div>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Taille entre</div>
        <div className='search_multi_value'>
          <input
            className='search_multi_value_num'
            type='number'
            name='tallMin'
            id='tallMin'
            min={50}
            max={250}
            autoComplete='number'
            ref={refTallMin}
          />
          <input
            className='search_multi_value_num'
            type='number'
            name='tallMax'
            id='tallMax'
            min={50}
            max={250}
            autoComplete='number'
            ref={refTallMax}
          />
        </div>
      </div>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Genre</div>
        <div className='search_multi_value'>
          <select
            className='search_multi_value_select'
            name='gender'
            id='gender'
            ref={refGender}
          >
            <option defaultValue='default'>---</option>
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
          <select
            className='search_multi_value_select'
            name='orientation'
            id='orientation'
            ref={refOrientation}
          >
            <option defaultValue='default'>---</option>
            <option value='Hétérosexuel(le)'>Hétérosexuel(le)</option>
            <option value='Homosexuel(le)'>Homosexuel(le)</option>
            <option value='Bisexuel(le)'>Bisexuel(le)</option>
            <option value='Pansexuel(le)'>Pansexuel(le)</option>
            <option value='Asexuel(le)'>Asexuel(le)</option>
            <option value='Demisexuel(le)'>Demisexuel(le)</option>
            <option value='Sapiosexuel(le)'>Sapiosexuel(le)</option>
            <option value='Polysexuel(le)'>Polysexuel(le)</option>
            <option value='Queer'>Queer</option>
            <option value='Skoliosexuel(le)'>Skoliosexuel(le)</option>
            <option value='Graysexuel(le)'>Graysexuel(le)</option>
            <option value='Autre'>Autre</option>
          </select>
        </div>
      </div>
      <div className='search_multi_row'>
        <div className='search_multi_label'>Note supérieure à</div>
        <div className='search_multi_value'>
          <input
            className='search_multi_value_num'
            type='number'
            name='fameMin'
            id='fameMin'
            min={0}
            autoComplete='number'
            ref={refFameRating}
          />
        </div>
      </div>
      <div className='search_multi_row_checkbox'>
        <label htmlFor='withPhoto' className='search_multi_value_label'>
          Avec photo
        </label>
        <input
          className='search_multi_value_checkbox'
          onChange={() => {
            setWithPhoto(!withPhoto);
          }}
          type='checkbox'
          name='withPhoto'
          id='withPhoto'
          checked={withPhoto}
        />
        <label htmlFor='withBio' className='search_multi_value_label'>
          Avec annonce
        </label>
        <input
          className='search_multi_value_checkbox'
          onChange={() => {
            setWithBio(!withBio);
          }}
          type='checkbox'
          name='withBio'
          id='withBio'
          checked={withBio}
        />
      </div>

      <div className='search_multi_submit'>
        <input
          className='search_multi_submit_button'
          onClick={handleSubmit}
          type='submit'
          name='multiSubmit'
          id='multiSubmit'
          value='Rechercher'
        />
        <input
          className='search_multi_submit_button'
          onClick={handleClear}
          type='button'
          name='multiClear'
          id='multiClear'
          value='Effacer'
        />
      </div>
    </>
  );
};

export default SearchMulti;
