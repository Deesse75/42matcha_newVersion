import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCode from '../components/InputCode';
import { authRoute, appRedir } from '../../appConfig/appPath';
import AuthInputContainer, { ValideAuthInput } from '../components/AuthInputContainer';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthReinitForm: FC<Props> = ({ setMatchaNotif, email, setEmail }) => {
  const [bodyRequest, setBodyRequest] = useState<{
    code: string;
    newPassword: string;
    email: string;
  } | null>(null);
  const [valideInput, setValideInput] = useState<ValideAuthInput>({
    firstname: false,
    lastname: false,
    username: false,
    birthdate: false,
    email: false,
    password: false,
  });
  const nav = useNavigate();
  const refPassword = useRef<HTMLInputElement>(null);
  const refInputCode = {
    ref1: useRef<HTMLInputElement>(null),
    ref2: useRef<HTMLInputElement>(null),
    ref3: useRef<HTMLInputElement>(null),
    ref4: useRef<HTMLInputElement>(null),
    ref5: useRef<HTMLInputElement>(null),
    ref6: useRef<HTMLInputElement>(null),
    ref7: useRef<HTMLInputElement>(null),
  };

  const handleClick = () => {
    const newPasswordValue = refPassword.current?.value.trim() || null;
    if (!newPasswordValue) {
      setMatchaNotif('Veuillez entrer votre nouveau mot de passe.');
      return;
    }
    if (!valideInput.password) {
      setMatchaNotif(
        'Le format du nouveau mot de passe est invalide.',
      );
      return;
    }
    if (
      refInputCode.ref1.current?.value === '' &&
      refInputCode.ref2.current?.value === '' &&
      refInputCode.ref3.current?.value === '' &&
      refInputCode.ref4.current?.value === '' &&
      refInputCode.ref5.current?.value === '' &&
      refInputCode.ref6.current?.value === ''
    ) {
      setMatchaNotif('Veuillez renseigner le code.');
      return;
    }

    const newCode: string = `${refInputCode.ref1.current?.value}${refInputCode.ref2.current?.value}${refInputCode.ref3.current?.value}${refInputCode.ref4.current?.value}${refInputCode.ref5.current?.value}${refInputCode.ref6.current?.value}`;
    if (!newCode || newCode.length !== 6) {
      setMatchaNotif('Le code est incorrect.');
      setEmail(null);
      return;
    }

    if (!email) {
      setMatchaNotif(
        'Nous avons rencontré un problème lors de la vérification de votre adresse actuelle. Veuillez recommencer.',
      );
      setEmail(null);
      return;
    }
    setBodyRequest({
      code: newCode,
      newPassword: newPasswordValue,
      email: email,
    });
  };

  const handleClear = () => {
    if (refPassword.current) refPassword.current.value = '';
    if (refInputCode.ref1.current) refInputCode.ref1.current.value = '';
    if (refInputCode.ref2.current) refInputCode.ref2.current.value = '';
    if (refInputCode.ref3.current) refInputCode.ref3.current.value = '';
    if (refInputCode.ref4.current) refInputCode.ref4.current.value = '';
    if (refInputCode.ref5.current) refInputCode.ref5.current.value = '';
    if (refInputCode.ref6.current) refInputCode.ref6.current.value = '';
    if (refInputCode.ref7.current) refInputCode.ref7.current.value = '';
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.reinitPassword, {
          method: 'PATCH',
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

        if (response.status !== 200) {
          setEmail(null);
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
      <div className='auth_reinit_form'>
        <div className='auth_reinit_title'>Entrez le code reçu par email</div>
        <div className='auth_reinit_number'>
          <InputCode
            id={1}
            currentRef={refInputCode.ref1}
            nextRef={refInputCode.ref2}
          />
          <InputCode
            id={2}
            currentRef={refInputCode.ref2}
            nextRef={refInputCode.ref3}
          />
          <InputCode
            id={3}
            currentRef={refInputCode.ref3}
            nextRef={refInputCode.ref4}
          />
          <InputCode
            id={4}
            currentRef={refInputCode.ref4}
            nextRef={refInputCode.ref5}
          />
          <InputCode
            id={5}
            currentRef={refInputCode.ref5}
            nextRef={refInputCode.ref6}
          />
          <InputCode
            id={6}
            currentRef={refInputCode.ref6}
            nextRef={refInputCode.ref7}
          />
        </div>

        <div className='auth_reinit_title'>
          Entrez votre nouveau mot de passe
        </div>

        <AuthInputContainer
          icon='password'
          inputType='newPassword'
          inputName='newPassword'
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
            Modifier
          </button>
          <button onClick={handleClear} className='auth_submit_button'>
            Effacer
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthReinitForm;
