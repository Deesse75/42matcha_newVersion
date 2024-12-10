import { FC, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import { convertDate } from '../../utils/convertDateFunctions';
import {
  usernameValidation,
  nameValidation,
  birthdateValidation,
} from '../../utils/inputValidation';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateUserData: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const refFirstname = useRef<HTMLInputElement>(null);
  const refLastname = useRef<HTMLInputElement>(null);
  const refUsername = useRef<HTMLInputElement>(null);
  const refBirthdate = useRef<HTMLInputElement>(null);
  const [bodyRequest, setBodyRequest] = useState<{
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    birthdate: Date | null;
  } | null>(null);

  const handleSubmit = () => {
    const firstname = refFirstname.current?.value.trim() || null;
    const lastname = refLastname.current?.value.trim() || null;
    const username = refUsername.current?.value.trim() || null;
    const birthdate = refBirthdate.current?.value || null;
    if (!firstname && !lastname && !username && !birthdate) {
      setMatchaNotif('Aucune donnée à modifier.');
      return;
    }
    if (username && !usernameValidation(username)) {
      setMatchaNotif("Le format du nom d'utilisateur est invalide.");
      return;
    }
    if (firstname && !nameValidation(firstname)) {
      setMatchaNotif('Le format du prénom est invalide.');
      return;
    }
    if (lastname && !nameValidation(lastname)) {
      setMatchaNotif('Le format du nom est invalide.');
      return;
    }
    if (birthdate && !birthdateValidation(birthdate)) {
      setMatchaNotif('La date de naissance est invalide.');
      return;
    }
    setBodyRequest({
      firstname: firstname,
      lastname: lastname,
      username: username,
      birthdate: birthdate ? new Date(birthdate) : null,
    });
  };

  const handleClear = () => {
    if (refFirstname.current) refFirstname.current.value = '';
    if (refLastname.current) refLastname.current.value = '';
    if (refUsername.current) refUsername.current.value = '';
    if (refBirthdate.current) refBirthdate.current.value = '';
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateUsertData, {
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
        if (refFirstname.current) refFirstname.current.value = '';
        if (refLastname.current) refLastname.current.value = '';
        if (refUsername.current) refUsername.current.value = '';
        if (refBirthdate.current) refBirthdate.current.value = '';
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
      <div className='update_account_container'>
        <div className='update_account_left'>
          <div className='update_account_left_section'>
            <div className='update_account_left_title'>Prénom</div>
            <div className='update_account_left_current'>
              {me.user?.firstname}
            </div>
            <input
              className='update_account_left_input'
              type='text'
              name='firstname'
              id='firstname'
              ref={refFirstname}
              placeholder='Nouveau prénom'
              maxLength={30}
              minLength={3}
            />
          </div>
          <div className='update_account_left_section'>
            <div className='update_account_left_title'>Nom</div>
            <div className='update_account_left_current'>
              {me.user?.lastname}
            </div>
            <input
              className='update_account_left_input'
              type='text'
              name='lastname'
              id='lastname'
              ref={refLastname}
              placeholder='Nouveau nom'
              maxLength={30}
              minLength={3}
            />
          </div>
          <div className='update_account_left_section'>
            <div className='update_account_left_title'>Nom d'utilisateur</div>
            <div className='update_account_left_current'>
              {me.user?.username}
            </div>
            <input
              className='update_account_left_input'
              type='text'
              name='username'
              id='username'
              ref={refUsername}
              placeholder='Nouveau pseudo'
              maxLength={30}
              minLength={3}
            />
          </div>
          <div className='update_account_left_section'>
            <div className='update_account_left_title'>Date de naissance</div>
            <div className='update_account_left_current'>
              {me.user ? convertDate(me.user.birthdate) : null}
            </div>
            <input
              className='update_account_left_input'
              type='date'
              name='birthdate'
              id='birthdate'
              ref={refBirthdate}
            />
          </div>
          <div className='update_account_left_submit'>
            <button
              className='update_account_submit_button'
              onClick={handleSubmit}
            >
              Mettre à jour
            </button>
            <button
              className='update_account_submit_button'
              onClick={handleClear}
            >
              Effacer
            </button>
          </div>
        </div>
        <div className='update_account_right'>
          <div className='update_account_right_section'>
            <UpdatePassword setMatchaNotif={setMatchaNotif} />
          </div>
          <div className='update_account_right_section'>
            <UpdateEmail setMatchaNotif={setMatchaNotif} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserData;
