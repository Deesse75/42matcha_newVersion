import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, authRoute } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import AuthInputContainer, {
  ValideAuthInput,
} from '../components/AuthInputContainer';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthSigninEmailForm: FC<Props> = ({ setMatchaNotif }) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [valideInput, setValideInput] = useState<ValideAuthInput>({
    firstname: false,
    lastname: false,
    username: false,
    birthdate: false,
    email: false,
    password: false,
  });
  const [bodyRequest, setBodyRequest] = useState<{
    email: string;
    password: string;
    region: string | null;
    county: string | null;
    town: string | null;
  } | null>(null);

  const handleClick = () => {
    const email = refEmail.current?.value.trim() || null;
    const password = refPassword.current?.value.trim() || null;

    if (!email || !password) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    if (!valideInput.email || !valideInput.password) {
      setMatchaNotif('Certains champs sont invalides.');
      return;
    }
    setBodyRequest({
      email: email,
      password: password,
      region: localStorage.getItem('region'),
      county: localStorage.getItem('county'),
      town: localStorage.getItem('town'),
    });
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
      <div className='auth_form'>
        <AuthInputContainer
          icon='email'
          inputType='email'
          inputName='email'
          max={-1}
          min={-1}
          autoComplete='email'
          refInput={refEmail}
          placeholder='Adresse email'
          displayEye={false}
          displayGen={false}
          valideInput={valideInput}
          setValideInput={setValideInput}
        />
        <AuthInputContainer
          icon='password'
          inputType='password'
          inputName='password'
          max={30}
          min={8}
          autoComplete='off'
          refInput={refPassword}
          placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          displayEye={true}
          displayGen={false}
          valideInput={valideInput}
          setValideInput={setValideInput}
        />
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
