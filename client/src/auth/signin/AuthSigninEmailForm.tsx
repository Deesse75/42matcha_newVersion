import { FC, useEffect, useRef, useState } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/inputValidation';
import { appRedir, authRoute } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import InputEye from '../../utils/InputEye';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthSigninEmailForm: FC<Props> = ({ setSystemNotif }) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const handleClick = () => {
    const email = refEmail.current?.value.trim() || null;
    const password = refPassword.current?.value.trim() || null;

    if (!email || !password) {
      setSystemNotif('Tous les champs sont requis.');
      return;
    }
    if (!emailValidation(email)) {
      setSystemNotif(
        "Le format de l'adresse email est invalide. Voir règles de saisie de formulaire en bas de page.",
      );
      return;
    }
    if (!passwordValidation(password)) {
      setSystemNotif(
        'Le format du mot de passe est invalide. Voir règles de saisie de formulaire en bas de page.',
      );
      return;
    }
    setBodyRequest({ email, password });
  };

  const handleClear = () => {
    if (refEmail.current) refEmail.current.value = '';
    if (refPassword.current) refPassword.current.value = '';
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
          setSystemNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }

        if (response.status !== 200) {
          setBodyRequest(null);
          setSystemNotif(data.message);
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
        setSystemNotif((error as Error).message);
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
            <MdOutlineAlternateEmail size={30} />
          </div>
          <input
            className='auth_signin_input_value'
            type='email'
            name='signin_email'
            id='signin_email'
            required
            autoComplete='email'
            ref={refEmail}
            placeholder='Adresse email'
          />
        </div>

        <div className='auth_signin_input_container'>
          <div className='auth_signin_input_icon'>
            <RiLockPasswordLine size={30} />
          </div>
          <input
            className='auth_signin_input_value'
            type='password'
            name='signin_email__password'
            id='signin_email__password'
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

export default AuthSigninEmailForm;
