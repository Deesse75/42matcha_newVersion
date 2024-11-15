import { FC, useEffect, useState } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateLookFor: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    ageMin: number;
    ageMax: number;
    tallMin: number;
    tallMax: number;
    gender: string | null;
    withPhoto: boolean;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ageMin = e.currentTarget?.ageMin.value;
    const ageMax = e.currentTarget?.ageMax.value;
    const tallMin = e.currentTarget?.tallMin.value;
    const tallMax = e.currentTarget?.tallMax.value;
    const gender = e.currentTarget?.genderSelect.value;
    const withPhoto = e.currentTarget?.withPhoto.checked;
    if (
      (!ageMin || !parseInt(ageMin)) &&
      (!ageMax || !parseInt(ageMax)) &&
      (!tallMin || !parseInt(tallMin)) &&
      (!tallMax || !parseInt(tallMax)) &&
      (!gender || gender === '---') &&
      !withPhoto
    ) {
      setMatchaNotif('Aucune donnée à modifier.');
      return;
    }
    setBodyRequest({
      ageMin: ageMin ? parseInt(ageMin) : 0,
      ageMax: ageMax ? parseInt(ageMax) : 0,
      tallMin: tallMin ? parseInt(tallMin) : 0,
      tallMax: tallMax ? parseInt(tallMax) : 0,
      gender: gender !== '---' ? gender : null,
      withPhoto: withPhoto,
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
          me.setUserLookFor(data.userLookFor);
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
