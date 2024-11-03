import { FC, useEffect, useRef, useState } from 'react';
import { appRedir, authRoute } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthInputContainer, { ValideAuthInput } from '../components/AuthInputContainer';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthSigninUsernameForm: FC<Props> = ({ setMatchaNotif }) => {
  const refUsername = useRef<HTMLInputElement>(null);
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
    if (!valideInput.username || !valideInput.password) {
      setMatchaNotif('Certains champs sont invalides.');
      return;
    }
    setBodyRequest({ username: username, password: password });
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
      <div className='auth_form'>
        <AuthInputContainer
          icon='name'
          inputType='text'
          inputName='username'
          max={30}
          min={3}
          autoComplete='username'
          refInput={refUsername}
          placeholder="Nom d'utilisateur"
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

export default AuthSigninUsernameForm;
