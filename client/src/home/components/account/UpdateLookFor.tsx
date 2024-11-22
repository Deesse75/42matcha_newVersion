import { FC, useEffect, useState } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateLookFor: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [wp, steWp] = useState<boolean>(me?.userLookFor?.withPhoto || false);
  const [bodyRequest, setBodyRequest] = useState<{
    ageMin: number | null;
    ageMax: number | null;
    tallMin: number | null;
    tallMax: number | null;
    gender: string | null;
    withPhoto: boolean;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ageMin = e.currentTarget?.ageMin.value;
    const ageMax = e.currentTarget?.ageMax.value;
    const tallMin = e.currentTarget?.tallMin.value;
    const tallMax = e.currentTarget?.tallMax.value;
    const gender = e.currentTarget?.lookForGender.value;
    if (
      !ageMin &&
      !ageMax &&
      !tallMin &&
      !tallMax &&
      (!gender || gender === '---') &&
      wp === me?.userLookFor?.withPhoto
    ) {
      setMatchaNotif('Aucune donnée à modifier.');
      return;
    }
    setBodyRequest({
      ageMin: ageMin ? parseInt(ageMin) : null,
      ageMax: ageMax ? parseInt(ageMax) : null,
      tallMin: tallMin ? parseInt(tallMin) : null,
      tallMax: tallMax ? parseInt(tallMax) : null,
      gender: gender !== '---' ? gender : null,
      withPhoto: wp,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateLookFor, {
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
        setReloadAccount('userLookFor');
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
      <div className='look_for_container'>
        <form onSubmit={handleSubmit}>
          <div className='look_for_block'>
            <div className='look_for_block_label'>Age minimum</div>
            <div className='look_for_block_current'>
              {me.userLookFor && me.userLookFor.ageMin
                ? `${me.userLookFor.ageMin} ans`
                : '-'}
            </div>
            <div className='look_for_block_new'>
              <input
                type='number'
                name='newAgeMin'
                id='newAgeMin'
                max={120}
                min={18}
              />
            </div>
          </div>
          <div className='look_for_block'>
            <div className='look_for_block_label'>Age maximum</div>
            <div className='look_for_block_current'>
              {me.userLookFor && me.userLookFor.ageMax
                ? `${me.userLookFor.ageMax} ans`
                : '-'}
            </div>
            <div className='look_for_block_new'>
              <input
                type='number'
                name='newAgeMax'
                id='newAgeMax'
                max={120}
                min={18}
              />
            </div>
          </div>
          <div className='look_for_block'>
            <div className='look_for_block_label'>Taille minimale</div>
            <div className='look_for_block_current'>
              {me.userLookFor && me.userLookFor.tallMin
                ? `${me.userLookFor.tallMin} cm`
                : '-'}
            </div>
            <div className='look_for_block_new'>
              <input
                type='number'
                name='newTallMin'
                id='newTallMin'
                max={250}
                min={50}
              />
            </div>
          </div>
          <div className='look_for_block'>
            <div className='look_for_block_label'>Taille maximale</div>
            <div className='look_for_block_current'>
              {me.userLookFor && me.userLookFor.tallMax
                ? `${me.userLookFor.tallMax} cm`
                : '-'}
            </div>
            <div className='look_for_block_new'>
              <input
                type='number'
                name='newTallMax'
                id='newTallMax'
                max={250}
                min={50}
              />
            </div>
          </div>
          <div className='look_for_block'>
            <div className='look_for_block_label'>Genre</div>
            <div className='look_for_block_current'>
              {me.userLookFor && me.userLookFor.gender
                ? me.userLookFor.gender
                : '-'}
            </div>
            <div className='look_for_block_new'>
              <select name='lookForGender' id='lookForGender'>
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
          <div className='look_for_block'>
            <div className='look_for_block_label'>Avec photo</div>
            <input
              type='checkbox'
              name='withPhoto'
              id='withPhoto'
              checked={wp}
              onChange={() => {
                steWp(!wp);
              }}
            />
          </div>
          <div className='look_for_submit'>
            <input
              type='submit'
              name='lookForSubmit'
              id='lookForSubmit'
              value='Modifier'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateLookFor;
