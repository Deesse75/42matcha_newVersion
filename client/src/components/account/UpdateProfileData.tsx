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
  const refGender = useRef<HTMLSelectElement>(null);
  const refOrientation = useRef<HTMLSelectElement>(null);
  const [bodyRequest, setBodyRequest] = useState<{
    gender: string | null;
    orientation: string | null;
    tall: number | null;
  } | null>(null);

  const handleSubmit = () => {
    const gender = refGender.current?.value || null;
    const orientation = refOrientation.current?.value || null;
    const tall = refTall.current?.value.trim() || null;
    if (
      (!gender || gender === '---') &&
      (!orientation || orientation === '---') &&
      (!tall || parseInt(tall) === 0)
    ) {
      setMatchaNotif('Aucune donnée à modifier.');
      return;
    }
    setBodyRequest({
      gender: gender,
      orientation: orientation,
      tall: tall ? parseInt(tall) : null,
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
        refGender.current!.value = 'default';
        refOrientation.current!.value = 'default';
        refTall.current!.value = '0';
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

        <div className='profile_section'>
          <div className='profile_name'>{`Taille (-1 pour supprimer)`}</div>
          <div className='profile_current_value'>
            {me.user && me.user.tall ? `${me.user.tall} cm` : '-'}
          </div>
          <div className='profile_new_value'>
            <input
              className='profile_new_value_input'
              type='number'
              name='newTall'
              id='newTall'
              min={-1}
              max={250}
              defaultValue={0}
              autoComplete='number'
              ref={refTall}
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
