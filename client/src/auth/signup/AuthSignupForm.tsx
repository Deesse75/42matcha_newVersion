import { FC, useRef, useState, useEffect } from 'react';
import {
  MdOutlineAlternateEmail,
  MdOutlineDriveFileRenameOutline,
} from 'react-icons/md';
import { BsCalendar2Date } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';
import usernameValidation, {
  emailValidation,
  nameValidation,
  passwordValidation,
} from '../../utils/inputValidation';
import InputEye from '../../utils/InputEye';
import generate from '../../utils/generate';
import convertAge from '../../utils/convertAge';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthSignupForm: FC<Props> = ({ setMatchaNotif }) => {
  const refFirstname = useRef<HTMLInputElement>(null);
  const refLastname = useRef<HTMLInputElement>(null);
  const refUsername = useRef<HTMLInputElement>(null);
  const refBirthdate = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    firstname: string;
    lastname: string;
    username: string;
    birthdate: Date;
    email: string;
    password: string;
  } | null>(null);

  const handleClick = () => {
    const firstname = refFirstname.current?.value.trim() || null;
    const lastname = refLastname.current?.value.trim() || null;
    const username = refUsername.current?.value.trim() || null;
    const birthdate = refBirthdate.current ? new Date(refBirthdate.current.value) : null;
    const email = refEmail.current?.value.trim() || null;
    const password = refPassword.current?.value.trim() || null;

    if (!username || !password || !firstname || !lastname || !email || !birthdate) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    if (!nameValidation(firstname)) {
      setMatchaNotif(
        'Le format du prénom est invalide. Voir règles de saisie de formulaire en bas de page.',
      );
      return;
    }

    if (!nameValidation(lastname)) {
      setMatchaNotif(
        'Le format du nom est invalide. Voir règles de saisie de formulaire en bas de page.',
      );
      return;
    }
    if (!usernameValidation(username)) {
      setMatchaNotif(
        "Le format du nom d'utilisateur est invalide. Voir règles de saisie de formulaire en bas de page.",
      );
      return;
    }
    if (parseInt(convertAge(birthdate.toISOString())) < 18) {
      setMatchaNotif('Vous devez avoir 18 ans ou plus pour vous inscrire.');
      return;
    }
    if (!passwordValidation(password)) {
      setMatchaNotif(
        'Le format du mot de passe est invalide. Voir règles de saisie de formulaire en bas de page.',
      );
      if (!emailValidation(email)) {
        setMatchaNotif(
          "Le format de l'adresse email est invalide. Voir règles de saisie de formulaire en bas de page.",
        );
        return;
      }
      return;
    }
    setBodyRequest({ firstname, lastname, username, birthdate, email, password });
  };

  const handleClear = () => {
    if (refFirstname.current) refFirstname.current.value = '';
    if (refLastname.current) refLastname.current.value = '';
    if (refUsername.current) refUsername.current.value = '';
    if (refBirthdate.current) refBirthdate.current.value = '';
    if (refEmail.current) refEmail.current.value = '';
    if (refPassword.current) refPassword.current.value = '';
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.signup, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyRequest),
        });
        const data = await response.json();
        if (!isMounted) return;

        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }

        setBodyRequest(null);
        if (response.status !== 201) {
          return;
        }
        nav(appRedir.signin);
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
      <div className='auth_signup_form'>
        <div className='auth_signup_input_container'>
          <div className='auth_signup_input_icon'>
            <MdOutlineDriveFileRenameOutline size={30} />
          </div>
          <input
            className='auth_signup_input_value'
            type='text'
            name='signin_firstname'
            id='signin_firstname'
            maxLength={30}
            minLength={3}
            required
            autoComplete='given-name'
            ref={refFirstname}
            placeholder='Prénom'
          />
        </div>

        <div className='auth_signup_input_container'>
          <div className='auth_signup_input_icon'>
            <MdOutlineDriveFileRenameOutline size={30} />
          </div>
          <input
            className='auth_signup_input_value'
            type='text'
            name='signin_lastname'
            id='signin_lastname'
            maxLength={30}
            minLength={3}
            required
            autoComplete='family-name'
            ref={refLastname}
            placeholder='Nom'
          />
        </div>

        <div className='auth_signup_input_container'>
          <div className='auth_signup_input_icon'>
            <MdOutlineDriveFileRenameOutline size={30} />
          </div>
          <input
            className='auth_signup_input_value'
            type='text'
            name='signin_username'
            id='signin_username'
            maxLength={30}
            minLength={3}
            required
            autoComplete='username'
            ref={refUsername}
            placeholder="Nom d'utilisateur"
          />
        </div>

        <div className='auth_signup_input_container'>
          <div className='auth_signup_input_icon'>
            <BsCalendar2Date />
          </div>
          <input
            className='auth_signup_input_value'
            type='date'
            name='signin_birthdate'
            id='signin_birthdate'
            maxLength={30}
            minLength={3}
            required
            autoComplete='off'
            ref={refBirthdate}
            placeholder="Date de naissance"
          />
        </div>

        <div className='auth_signup_input_container'>
          <div className='auth_signup_input_icon'>
            <MdOutlineAlternateEmail size={30} />
          </div>
          <input
            className='auth_signup_input_value'
            type='email'
            name='signin_email'
            id='signin_email'
            required
            autoComplete='email'
            ref={refEmail}
            placeholder='Adresse email'
          />
        </div>

        <div className='auth_signup_input_container'>
          <div className='auth_signup_input_icon'>
            <RiLockPasswordLine size={30} />
          </div>
          <input
            className='auth_signup_input_value'
            type='password'
            name='signin_password'
            id='signin_password'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refPassword}
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          />
          <InputEye refInput={refPassword} />
          <div
            className='auth_input_password_generate'
            onClick={() => {
              generate(refPassword);
            }}
          >
            Random Pass
          </div>
        </div>

        <div className='auth_submit'>
          <button onClick={handleClick} className='auth_submit_button'>
            S'enregistrer
          </button>
          <button onClick={handleClear} className='auth_submit_button'>
            Effacer
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthSignupForm;
