import { FC, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';
import AuthInputContainer, {
  ValideAuthInput,
} from '../components/AuthInputContainer';

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
  const [valideInput, setValideInput] = useState<ValideAuthInput>({
    firstname: false,
    lastname: false,
    username: false,
    birthdate: false,
    email: false,
    password: false,
  });
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
    const birthdate = new Date(refBirthdate!.current!.value);
    const email = refEmail.current?.value.trim() || null;
    const password = refPassword.current?.value.trim() || null;

    if (
      !username ||
      !password ||
      !firstname ||
      !lastname ||
      !email ||
      !birthdate
    ) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    if (
      !valideInput.firstname ||
      !valideInput.lastname ||
      !valideInput.username ||
      !valideInput.birthdate ||
      !valideInput.email ||
      !valideInput.password
    ) {
      setMatchaNotif('Certains champs sont invalides.');
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

        if (response.status !== 201) {
          setBodyRequest(null);
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
      <div className='auth_form'>
        <AuthInputContainer
          icon='name'
          inputType='text'
          inputName='firstname'
          max={30}
          min={3}
          autoComplete='given-name'
          refInput={refFirstname}
          placeholder='Prénom'
          displayEye={false}
          displayGen={false}
          valideInput={valideInput}
          setValideInput={setValideInput}
        />
        <AuthInputContainer
          icon='name'
          inputType='text'
          inputName='lastname'
          max={30}
          min={3}
          autoComplete='family-name'
          refInput={refLastname}
          placeholder='Nom'
          displayEye={false}
          displayGen={false}
          valideInput={valideInput}
          setValideInput={setValideInput}
        />
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
          icon='birthdate'
          inputType='date'
          inputName='birthdate'
          max={-1}
          min={-1}
          autoComplete='off'
          refInput={refBirthdate}
          placeholder='Date de naissance'
          displayEye={false}
          displayGen={false}
          valideInput={valideInput}
          setValideInput={setValideInput}
        />
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
          displayGen={true}
          valideInput={valideInput}
          setValideInput={setValideInput}
        />

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
