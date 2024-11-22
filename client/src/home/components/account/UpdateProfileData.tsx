import { FC, useEffect, useState } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateProfileData: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    gender: string | null;
    orientation: string | null;
    tall: number | null;
    biography: string | null;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gender = e.currentTarget?.newGender.value;
    const orientation = e.currentTarget?.newOrientation.value;
    const tall = e.currentTarget?.newTall.value;
    const biography = e.currentTarget?.newBiography.value.trim();
    if (
      (!gender || gender === '---') &&
      (!orientation || orientation === '---') &&
      !tall &&
      biography === me?.user?.biography
    ) {
      setMatchaNotif('Aucune donnée à modifier.');
      return;
    }
    if (tall && parseInt(tall) < 0) {
      setMatchaNotif('La taille ne peut pas être négative.');
      return;
    }
    if (tall && parseInt(tall) > 250) {
      setMatchaNotif('La taille ne peut depasser 250.');
      return;
    }
    setBodyRequest({
      gender: gender !== '---' ? gender : null,
      orientation: orientation !== '---' ? orientation : null,
      tall: tall ? parseInt(tall) : null,
      biography: biography === me?.user?.biography ? null : biography,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateProfileData, {
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
        setReloadAccount('userData');
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
      <div className='profile_container'>
        <form onClick={handleSubmit} className='profile_form'>
          <div className='profile_form_section'>
            <div className='profile_form_name'>Genre</div>
            <div className='profile_form_currentValue'>
              {me.user && me.user.gender ? me.user.gender : '-'}
            </div>
            <div className='profile_form_newValue'>
              <select
                className='profile_form_newValue_select'
                name='newGender'
                id='newGender'
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
                <option value='delete'>Supprimer la valeur actuelle</option>
              </select>
            </div>
          </div>

          <div className='profile_form_section'>
            <div className='profile_form_name'>Orientation sexuelle</div>
            <div className='profile_form_currentValue'>
              {me.user && me.user.orientation ? me.user.orientation : '-'}
            </div>
            <div className='profile_form_newValue'>
              <select
                className='profile_form_newValue_select'
                name='newOrientation'
                id='newOrientation'
              >
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
                <option value='delete'>Supprimer la valeur actuelle</option>
              </select>
            </div>
          </div>

          <div className='profile_form_section'>
            <div className='profile_form_name'>Taille</div>
            <div className='profile_form_currentValue'>
              {me.user && me.user.tall ? `${me.user.tall} cm` : '-'}
            </div>
            <div className='profile_form_newValue'>
              <input
                className='profile_form_newValue_input'
                type='number'
                name='newTall'
                id='newTall'
                min={0}
                max={250}
                autoComplete='number'
              />
            </div>
          </div>

          <div className='profile_form_section_textarea'>
            <div className='profile_form_name'>Annonce</div>
            <div className='profile_form_currentValue'>
              {me.user && me.user.biography ? me.user.biography : '-'}
            </div>
            <div className='profile_form_newValue'>
              <textarea
                className='profile_form_newValue_textarea'
                name='newBiography'
                id='newBiography'
                placeholder='Nouvelle annonce'
                maxLength={450}
                defaultValue={
                  me.user && me.user.biography ? me.user.biography : ''
                }
              ></textarea>
            </div>
          </div>

          <input
            type='submit'
            name='profileSubmit'
            id='profileSubmit'
            value='Modifier le profil'
          />
        </form>
      </div>
    </>
  );
};

export default UpdateProfileData;
