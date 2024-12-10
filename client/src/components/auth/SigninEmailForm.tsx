import { FC, useState, useRef, useEffect } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';
import InputEye from '../../utils/InputEye';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/inputValidation';
import InputValidationIcons from '../../utils/InputValidationIcons';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SigninEmailForm: FC<Props> = ({ setMatchaNotif }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState<string | null>(null);
  const [validPassword, setValidPassword] = useState<string | null>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    email: string;
    password: string;
    region: string | null;
    county: string | null;
    town: string | null;
  } | null>(null);

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
    if (refEmail.current) refEmail.current.value = '';
    if (refPassword.current) refPassword.current.value = '';
    setValidEmail(null);
    setValidPassword(null);
  };

  const handleSubmit = () => {
    if (validEmail === 'invalid') {
      setMatchaNotif("Le format de l'adresse email est invalide.");
      return;
    }
    if (validPassword === 'invalid') {
      setMatchaNotif('Le format du mot de passe est invalide.');
      return;
    }
    if (!email || !password) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    setBodyRequest({
      email: email,
      password: password,
      region: localStorage?.getItem('region') ?? null,
      county: localStorage?.getItem('county') ?? null,
      town: localStorage?.getItem('town') ?? null,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.signinEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyRequest),
        });
        const data = await response.json();
        if (!isMounted) return;

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

        Cookies.set('session', data.token, {
          expires: undefined,
          sameSite: 'None',
          secure: true,
        });

        nav(appRedir.getMe);
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
            autoComplete='password'
            ref={refPassword}
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'>
              <InputEye refPassword={refPassword} />
            </div>
            <div className='form_end_icon_container'></div>
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
            value='Se connecter'
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

export default SigninEmailForm;
