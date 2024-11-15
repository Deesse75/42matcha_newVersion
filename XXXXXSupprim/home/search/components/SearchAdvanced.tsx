import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../../appContext/user.context';
import { appRedir, searchRoute } from '../../../../appConfig/appPath';
import { SearchAdvanceRequestType } from '../../../../appConfig/interface';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchAdvanced: FC<Props> = ({ setMatchaNotif }) => {
  const [bodyRequest, setBodyRequest] =
    useState<SearchAdvanceRequestType | null>(null);
  const nav = useNavigate();
  const me = useUserInfo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ageMin = e?.currentTarget?.ageMin?.value;
    const ageMax = e?.currentTarget?.ageMax?.value;
    const gender = e?.currentTarget?.gender.value;
    const orientation = e?.currentTarget?.orientation.value;
    const tallMin = e?.currentTarget?.tallMin?.value;
    const tallMax = e?.currentTarget?.tallMax?.value;
    const advancePhoto = e?.currentTarget?.advancePhoto.checked;

    if (
      !ageMin &&
      !ageMax &&
      gender === '---' &&
      orientation === '---' &&
      !tallMin &&
      !tallMax &&
      !advancePhoto
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
      advancePhoto: advancePhoto,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(searchRoute.searchAdvance, {
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
        if (response.status !== 200) {
          setBodyRequest(null);
          setMatchaNotif(data.message);
          return;
        }
        me.setSearchResult(data.searchResult);
        me.setSearchRequest(bodyRequest);
        setBodyRequest(null);
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
      <form className='search_advance_form' onSubmit={handleSubmit}>
        <div className='search_advance_top'>
          <div className='search_advance_label'>
            <div className='search_advance_label_text'>Age minimum</div>
            <div className='search_advance_label_text'>Age maximum</div>
            <div className='search_advance_label_text'>Genre</div>
            <div className='search_advance_label_text'>
              Orientation sexuelle
            </div>
            <div className='search_advance_label_text'>Taille minimale</div>
            <div className='search_advance_label_text'>Taille maximale</div>
            <div className='search_advance_label_text'>
              Avec photo uniquement
            </div>
          </div>
          <div className='search_advance_choice'>
            <div className='search_advance_choice_value'>
              <input
                className='search_advance_choice_value_input'
                type='number'
                min={18}
                max={120}
                autoComplete='off'
                name='ageMin'
                id='ageMin'
              />
            </div>
            <div className='search_advance_choice_value'>
              <input
                className='search_advance_choice_value_input'
                type='number'
                min={18}
                max={120}
                autoComplete='off'
                name='ageMax'
                id='ageMax'
              />
            </div>
            <div className='search_advance_choice_value'>
              <select className='' name='gender' id='gender'>
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
            <div className='search_advance_choice_value'>
              <select className='' name='orientation' id='orientation'>
                <option defaultValue='default'>---</option>
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
            <div className='search_advance_choice_value'>
              <input
                className='search_advance_choice_value_input'
                type='number'
                max={250}
                min={50}
                autoComplete='off'
                name='tallMin'
                id='tallMin'
              />
            </div>
            <div className='search_advance_choice_value'>
              <input
                className='search_advance_choice_value_input'
                type='number'
                max={250}
                min={50}
                autoComplete='off'
                name='tallMax'
                id='tallMax'
              />
            </div>
            <div className='search_advance_choice_value'>
              <input type='checkbox' name='advancePhoto' id='advancePhoto' />
            </div>
          </div>
        </div>

        <div className='search_advance_bottom'>
          <div className='search_advance_submit'>
            <input
              className='search_advance_submit_button'
              type='submit'
              name='advanceSubmit'
              id='advanceSubmit'
              value='Rechercher'
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchAdvanced;
