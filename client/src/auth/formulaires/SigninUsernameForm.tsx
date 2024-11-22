import { FC, useEffect, useRef, useState } from 'react';
import { appRedir, authRoute } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import {
  passwordValidation,
  usernameValidation,
} from '../../utils/inputValidation';
import InputEye from '../../utils/InputEye';
import InputValidationIcons from '../../utils/InputValidationIcons';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SigninUsernameForm: FC<Props> = ({ setMatchaNotif }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [validUsername, setValidUsername] = useState<string | null>(null); //valid, invalid, null
  const [validPassword, setValidPassword] = useState<string | null>(null);
  const refUsername = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    username: string;
    password: string;
    region: string | null;
    county: string | null;
    town: string | null;
  } | null>(null);

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

  const handleCheckPassword = () => {
    const password = refPassword.current?.value.trim() || null;
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
    if (refUsername.current) refUsername.current.value = '';
    if (refPassword.current) refPassword.current.value = '';
    setValidUsername(null);
    setValidPassword(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validUsername === 'invalid') {
      setMatchaNotif("Le format du nom d'utilisateur est invalide.");
      return;
    }
    if (validPassword === 'invalid') {
      setMatchaNotif('Le format du mot de passe est invalide.');
      return;
    }
    if (!username || !password) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    setBodyRequest({
      username: username,
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
        const response = await fetch(authRoute.signinUsername, {
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
      <div className='auth_form_container'>
        <form onSubmit={handleSubmit} className='auth_form'>
          <div className='auth_form_row'>
            <div className='auth_form_icon'>
              <MdOutlineDriveFileRenameOutline size={25} color='#444444' />
            </div>
            <input
              className='auth_form_input'
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
            <div className='auth_form_end_container'>
              <div className='auth_form_end_icon_container'>
                <InputValidationIcons state={validUsername} type='username' />
              </div>
            </div>
          </div>
          <div className='auth_form_row'>
            <div className='auth_form_icon'>
              <RiLockPasswordLine size={25} color='#444444' />
            </div>
            <input
              className='auth_form_input'
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
            <div className='auth_form_end_container'>
              <div className='auth_form_end_icon_container'>
                <InputEye refPassword={refPassword} />
              </div>
              <div className='auth_form_end_icon_container'>
                <InputValidationIcons state={validPassword} type='password' />
              </div>
            </div>
          </div>
          <div className='auth_submit'>
            <input
              className='auth_submit_button'
              type='submit'
              name='authSubmit'
              id='authSubmit'
              value='Se connecter'
            />
            <input
              className='auth_submit_button'
              type='button'
              name='authClear'
              id='authClear'
              value='Effacer'
              onClick={handleClear}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SigninUsernameForm;
