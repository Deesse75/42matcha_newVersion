import { FC, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';
import {
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
  birthdateValidation,
} from '../../utils/inputValidation';
import {
  MdOutlineAlternateEmail,
  MdOutlineDriveFileRenameOutline,
} from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputEye from '../../utils/InputEye';
import { BsCalendar2Date } from 'react-icons/bs';
import GeneratePassword from '../../utils/GeneratePassword';
import InputValidationIcons from '../../utils/InputValidationIcons';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SignupForm: FC<Props> = ({ setMatchaNotif }) => {
  const refFirstname = useRef<HTMLInputElement>(null);
  const refLastname = useRef<HTMLInputElement>(null);
  const refUsername = useRef<HTMLInputElement>(null);
  const refBirthdate = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [validFirstname, setValidFirstname] = useState<string | null>(null);
  const [validLastname, setValidLastname] = useState<string | null>(null);
  const [validUsername, setValidUsername] = useState<string | null>(null);
  const [validBirthdate, setValidBirthdate] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState<string | null>(null);
  const [validPassword, setValidPassword] = useState<string | null>(null);
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    firstname: string;
    lastname: string;
    username: string;
    birthdate: Date;
    email: string;
    password: string;
  } | null>(null);

  const handleCheckFirstname = () => {
    const firstname = refFirstname.current?.value.trim() || null;
    if (!firstname) return;
    if (!nameValidation(firstname)) {
      setValidFirstname('invalid');
      setMatchaNotif('Le format du prénom est invalide.');
      return;
    }
    setValidFirstname('valid');
    setFirstname(firstname);
  };

  const handleCheckLastname = () => {
    const lastname = refLastname.current?.value.trim() || null;
    if (!lastname) return;
    if (!nameValidation(lastname)) {
      setValidLastname('invalid');
      setMatchaNotif('Le format du nom est invalide.');
      return;
    }
    setValidLastname('valid');
    setLastname(lastname);
  };

  const handleCheckUsername = () => {
    const username = refUsername.current?.value.trim() || null;
    if (!username) return;
    if (!usernameValidation(username)) {
      setValidUsername('invalid');
      setMatchaNotif("Le format du nom d'utilisateur est invalide.");
      return;
    }
    setValidUsername('valid');
    setUsername(username);
  };

  const handleCheckBirthdate = () => {
    const birthdate = refBirthdate.current?.value || null;
    if (!birthdate) return;
    if (!birthdateValidation(birthdate)) {
      setValidBirthdate('invalid');
      setMatchaNotif('La date de naissance est invalide.');
      return;
    }
    setValidBirthdate('valid');
    setBirthdate(new Date(birthdate));
  };

  const handleCheckEmail = () => {
    const email = refEmail.current?.value.trim() || null;
    if (!email) return;
    if (!emailValidation(email)) {
      setValidEmail('invalid');
      setMatchaNotif("Le format de l'adresse email est invalide.");
      return;
    }
    setValidEmail('valid');
    setEmail(email);
  };

  const handleCheckPassword = () => {
    const password = refPassword.current?.value || null;
    if (!password) return;
    if (!passwordValidation(password)) {
      setValidPassword('invalid');
      setMatchaNotif('Le format du mot de passe est invalide.');
      return;
    }
    setValidPassword('valid');
    setPassword(password);
  };

  const handleClear = () => {
    if (refFirstname.current) refFirstname.current.value = '';
    if (refLastname.current) refLastname.current.value = '';
    if (refUsername.current) refUsername.current.value = '';
    if (refBirthdate.current) refBirthdate.current.value = '';
    if (refEmail.current) refEmail.current.value = '';
    if (refPassword.current) refPassword.current.value = '';
    setValidFirstname(null);
    setValidLastname(null);
    setValidUsername(null);
    setValidBirthdate(null);
    setValidEmail(null);
    setValidPassword(null);
  };

  const handleSubmit = () => {
    if (validFirstname === 'invalid') {
      setMatchaNotif('Le format du prénom est invalide.');
      return;
    }
    if (validLastname === 'invalid') {
      setMatchaNotif('Le format du nom est invalide.');
      return;
    }
    if (validUsername === 'invalid') {
      setMatchaNotif("Le format du nom d'utilisateur est invalide.");
      return;
    }
    if (validBirthdate === 'invalid') {
      setMatchaNotif('La date de naissance est invalide.');
      return;
    }
    if (validEmail === 'invalid') {
      setMatchaNotif("Le format de l'adresse email est invalide.");
      return;
    }
    if (validPassword === 'invalid') {
      setMatchaNotif('Le format du mot de passe est invalide.');
      return;
    }
    if (
      !firstname ||
      !lastname ||
      !username ||
      !birthdate ||
      !email ||
      !password
    ) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    setBodyRequest({
      firstname: firstname,
      lastname: lastname,
      username: username,
      birthdate: birthdate,
      email: email,
      password: password,
    });
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
      <div className='form_container'>
        <div className='form_row'>
          <div className='form_icon'>
            <MdOutlineDriveFileRenameOutline size={25} color='#444444' />
          </div>
          <input
            className='form_input'
            onBlur={handleCheckFirstname}
            onClick={() => {
              setValidFirstname(null);
            }}
            type='text'
            name='firstname'
            id='firstname'
            maxLength={30}
            minLength={3}
            required
            autoComplete='given-name'
            ref={refFirstname}
            placeholder='Prénom'
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'>
              <InputValidationIcons state={validFirstname} type='firstname' />
            </div>
          </div>
        </div>
        <div className='form_row'>
          <div className='form_icon'>
            <MdOutlineDriveFileRenameOutline size={25} color='#444444' />
          </div>
          <input
            className='form_input'
            onBlur={handleCheckLastname}
            onClick={() => {
              setValidLastname(null);
            }}
            type='text'
            name='lastname'
            id='lastname'
            maxLength={30}
            minLength={3}
            required
            autoComplete='family-name'
            ref={refLastname}
            placeholder='Nom'
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'>
              <InputValidationIcons state={validLastname} type='lastname' />
            </div>
          </div>
        </div>
        <div className='form_row'>
          <div className='form_icon'>
            <MdOutlineDriveFileRenameOutline size={25} color='#444444' />
          </div>
          <input
            className='form_input'
            onBlur={handleCheckUsername}
            onClick={() => {
              setValidUsername(null);
            }}
            type='text'
            name='username'
            id='username'
            maxLength={30}
            minLength={3}
            required
            autoComplete='username'
            ref={refUsername}
            placeholder='Nom d utilisateur'
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'>
              <InputValidationIcons state={validUsername} type='username' />
            </div>
          </div>
        </div>
        <div className='form_row'>
          <div className='form_icon'>
            <BsCalendar2Date size={25} color='#444444' />
          </div>
          <input
            className='form_input'
            onBlur={handleCheckBirthdate}
            onClick={() => {
              setValidBirthdate(null);
            }}
            type='date'
            name='birthdate'
            id='birthdate'
            required
            autoComplete='off'
            ref={refBirthdate}
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'>
              <InputValidationIcons state={validBirthdate} type='birthdate' />
            </div>
          </div>
        </div>
        <div className='form_row'>
          <div className='form_icon'>
            <MdOutlineAlternateEmail size={25} color='#444444' />
          </div>
          <input
            className='form_input'
            onBlur={handleCheckEmail}
            onClick={() => {
              setValidEmail(null);
            }}
            type='email'
            name='email'
            id='email'
            required
            autoComplete='email'
            ref={refEmail}
            placeholder='example@email.fr'
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'>
              <InputValidationIcons state={validEmail} type='email' />
            </div>
          </div>
        </div>
        <div className='form_row'>
          <div className='form_icon'>
            <RiLockPasswordLine size={25} color='#444444' />
          </div>
          <input
            className='form_input'
            onBlur={handleCheckPassword}
            onClick={() => {
              setValidPassword(null);
            }}
            type='password'
            name='password'
            id='password'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refPassword}
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'>
              <InputEye refPassword={refPassword} />
            </div>
            <div className='form_end_icon_container'>
              <GeneratePassword refPassword={refPassword} />
            </div>
            <div className='form_end_icon_container'>
              <InputValidationIcons state={validPassword} type='password' />
            </div>
          </div>
        </div>
        <div className='form_submit'>
          <input
            className='form_submit_button'
            onClick={handleSubmit}
            type='submit'
            name='authSubmit'
            id='authSubmit'
            value="S'inscrire"
          />
          <input
            className='form_submit_button'
            type='button'
            name='authClear'
            id='authClear'
            value='Effacer'
            onClick={handleClear}
          />
        </div>
      </div>
    </>
  );
};

export default SignupForm;
