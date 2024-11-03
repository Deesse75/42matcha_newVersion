import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, authRoute } from '../../appConfig/appPath';
import AuthInputContainer, { ValideAuthInput } from '../components/AuthInputContainer';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthForgotForm: FC<Props> = ({ setMatchaNotif, setEmail }) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [valideInput, setValideInput] = useState<ValideAuthInput>({
    firstname: true,
    lastname: true,
    username: true,
    birthdate: true,
    email: false,
    password: true,
  });
  const nav = useNavigate();

  const handleClick = () => {
    const email = refEmail.current?.value.trim() || null;

    if (!email) {
      setMatchaNotif("Veuillez remplir l'adresse email.");
      return;
    }
    if (!valideInput.email) {
      setMatchaNotif('Adresse email invalide.');
      return;
    }
    setCurrentEmail(email);
  };

  const handleClear = () => {
    if (refEmail.current) refEmail.current.value = '';
  };

  useEffect(() => {
    if (!currentEmail) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.forgotPassword, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email: currentEmail}),
        });
        const data = await response.json();
        if (!isMounted) return;

        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }

        if (response.status !== 200) {
          setCurrentEmail(null);
          return;
        }

        setEmail(currentEmail);
        setCurrentEmail(null);
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
  }, [currentEmail]);

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

        <div className='auth_submit'>
          <button onClick={handleClick} className='auth_submit_button'>
            Recevoir un lien
          </button>
          <button onClick={handleClear} className='auth_submit_button'>
            Effacer
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForgotForm;
