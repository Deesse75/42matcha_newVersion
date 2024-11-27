import { FC, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateProfileData: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const refTall = useRef<HTMLInputElement>(null);
  const refDelTall = useRef<HTMLInputElement>(null);
  const refGender = useRef<HTMLSelectElement>(null);
  const refOrientation = useRef<HTMLSelectElement>(null);
  const [bodyRequest, setBodyRequest] = useState<{
    gender: string | null;
    orientation: string | null;
    tall: number | null;
    delTall: boolean;
  } | null>(null);

  const handleSubmit = () => {
    const gender = refGender.current?.value || null;
    const orientation = refOrientation.current?.value || null;
    const tall = refTall.current?.value || null;
    const delTall = refDelTall.current?.checked || false;
    if (
      (!gender || gender === '---') &&
      (!orientation || orientation === '---') &&
      !tall &&
      !delTall
    ) {
      setMatchaNotif('Aucune donnée à modifier.');
      return;
    }
    if (delTall && !me.user?.tall) {
      setMatchaNotif('Aucune taille à supprimer.');
      return;
    }
    setBodyRequest({
      gender: gender === '---' ? null : gender,
      orientation: orientation === '---' ? null : orientation,
      tall: tall ? parseInt(tall) : null,
      delTall,
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
        refGender.current!.value = '---';
        refOrientation.current!.value = '---';
        refTall.current!.value = '';
        refDelTall.current!.checked = false;
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
        <div className='profile_section'>
          <div className='profile_name'>Genre</div>
          <div className='profile_current_value'>
            {me.user && me.user.gender ? me.user.gender : '-'}
          </div>
          <div className='profile_new_value'>
            <select
              className='profile_new_value_input'
              name='newGender'
              id='newGender'
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
              <option value='delete'>Supprimer la valeur actuelle</option>
            </select>
          </div>
        </div>

        <div className='profile_section'>
          <div className='profile_name'>Orientation sexuelle</div>
          <div className='profile_current_value'>
            {me.user && me.user.orientation ? me.user.orientation : '-'}
          </div>
          <div className='profile_new_value'>
            <select
              className='profile_new_value_input'
              name='newOrientation'
              id='newOrientation'
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
              <option value='delete'>Supprimer la valeur actuelle</option>
            </select>
          </div>
        </div>

        <div className='profile_section'>
          <div className='profile_name'>{`Taille (0 pour supprimer)`}</div>
          <div className='profile_current_value'>
            {me.user && me.user.tall ? `${me.user.tall} cm` : '-'}
          </div>
          <div className='profile_new_value'>
            <input
              className='profile_new_value_input_tall'
              type='number'
              name='newTall'
              id='newTall'
              min={50}
              max={250}
              autoComplete='number'
              ref={refTall}
            />
            <label htmlFor='delTall'>Supprimer la taille</label>
            <input
              type='checkbox'
              name='delTall'
              id='delTall'
              ref={refDelTall}
            />
          </div>
        </div>

        <div className='profile_submit'>
          <button className='profile_submit_button' onClick={handleSubmit}>
            Modifier
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProfileData;
