import { FC, useRef } from 'react';
import { useUserInfo } from '../../../appContext/user.context';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProfileOptional: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const refTown = useRef<HTMLInputElement>(null);

  const handleClickGeoloc = () => {};

  const handleBlurLocation = () => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className='profile_optional_title'>
        Compléter votre profil pour plus de visibilité
      </div>
      <form onClick={handleSubmit} className='optional_form'>
        <div className='optional_form_row'>
          <div className='optional_form_name'>Genre</div>
          <div className='optional_form_currentValue'>
            {me.user && me.user.gender ? me.user.gender : '-'}
          </div>
          <div className='optional_form_newValue'>
            <select name='newGender' id='newGender'>
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

        <div className='optional_form_row'>
          <div className='optional_form_name'>Orientation sexuelle</div>
          <div className='optional_form_currentValue'>
            value={me.user && me.user.orientation ? me.user.orientation : ''}
          </div>
          <div className='optional_form_newValue'>
            <select name='newOrientation' id='newOrientation'>
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
        </div>

        <div className='optional_form_row'>
          <div className='optional_form_name'>Localisation</div>
          <div className='optional_form_currentValue'>
            {me.user && me.user.region ? `${me.user.region}, ` : ''}
            {me.user && me.user.county ? `${me.user.county}, ` : ''}
            {me.user && me.user.town ? me.user.town : ''}
          </div>
          <div className='optional_form_newValue'>
            <input
              onBlur={handleBlurLocation}
              className=''
              type='text'
              name='newRegion'
              id='newRegion'
              ref={refTown}
              autoComplete='off'
              placeholder='Entrez votre ville'
            />
            <button onClick={handleClickGeoloc}>
              Utiliser la géolocalisation
            </button>
          </div>
        </div>


        <input
          type='submit'
          name=''
          id=''
          value='Mettre à jour les valeurs modifiées'
        />
      </form>
    </>
  );
};

export default ProfileOptional;
