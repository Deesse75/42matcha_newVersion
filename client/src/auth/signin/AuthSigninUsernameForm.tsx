import { FC, useEffect, useRef, useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import {
  usernameValidation,
  passwordValidation,
} from '../../utils/inputValidation';
import { appRedir, authRoute } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import InputEye from '../../utils/InputEye';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthSigninUsernameForm: FC<Props> = ({ setMatchaNotif }) => {
  const refUsername = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    username: string;
    password: string;
  } | null>(null);

  const handleClick = () => {
    const username = refUsername.current?.value.trim() || null;
    const password = refPassword.current?.value.trim() || null;

    if (!username || !password) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    if (!usernameValidation(username)) {
      setMatchaNotif(
        "Le format du nom d'utilisateur est invalide. Voir règles de saisie de formulaire en bas de page.",
      );
      return;
    }
    if (!passwordValidation(password)) {
      setMatchaNotif(
        'Le format du mot de passe est invalide. Voir règles de saisie de formulaire en bas de page.',
      );
      return;
    }
    setBodyRequest({ username, password });
  };

  const handleClear = () => {
    if (refUsername.current) refUsername.current.value = '';
    if (refPassword.current) refPassword.current.value = '';
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

        if (response.status !== 200) {
          setBodyRequest(null);
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
      <div className='auth_signin_form'>
        <div className='auth_signin_input_container'>
          <div className='auth_signin_input_icon'>
            <MdOutlineDriveFileRenameOutline size={30} />
          </div>
          <input
            className='auth_signin_input_value'
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

        <div className='auth_signin_input_container'>
          <div className='auth_signin_input_icon'>
            <RiLockPasswordLine size={30} />
          </div>
          <input
            className='auth_signin_input_value'
            type='password'
            name='signin_username_password'
            id='signin_username_password'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refPassword}
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          />
          <InputEye refInput={refPassword} />
        </div>

        <div className='auth_submit'>
          <button onClick={handleClick} className='auth_submit_button'>
            Se connecter
          </button>
          <button onClick={handleClear} className='auth_submit_button'>
            Effacer
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthSigninUsernameForm;
