import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCode from '../../utils/InputCode';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputEye from '../../utils/InputEye';
import generate from '../../utils/generate';
import { passwordValidation } from '../../utils/inputValidation';
import { authRoute, appRedir } from '../../appConfig/appPath';

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
  const nav = useNavigate();
  const refPassword = useRef<HTMLInputElement>(null);
  const refInput = {
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
    if (!passwordValidation(newPasswordValue)) {
      setMatchaNotif(
        'Le format du nouveau mot de passe est invalide. Voir règles de saisie de formulaire.',
      );
      return;
    }
    if (
      refInput.ref1.current?.value === '' &&
      refInput.ref2.current?.value === '' &&
      refInput.ref3.current?.value === '' &&
      refInput.ref4.current?.value === '' &&
      refInput.ref5.current?.value === '' &&
      refInput.ref6.current?.value === ''
    ) {
      setMatchaNotif('Veuillez remplir le code.');
      return;
    }

    const newCode: string = `${refInput.ref1.current?.value}${refInput.ref2.current?.value}${refInput.ref3.current?.value}${refInput.ref4.current?.value}${refInput.ref5.current?.value}${refInput.ref6.current?.value}`;
    if (!newCode || newCode.length !== 6) {
      setMatchaNotif('Le code est incorrect.');
      setEmail(null);
      return;
    }

    if (!email) {
      setMatchaNotif(
        'Il y a une erreur avec votre adresse email actuelle. Veuillez recommencer.',
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
    if (refInput.ref1.current) refInput.ref1.current.value = '';
    if (refInput.ref2.current) refInput.ref2.current.value = '';
    if (refInput.ref3.current) refInput.ref3.current.value = '';
    if (refInput.ref4.current) refInput.ref4.current.value = '';
    if (refInput.ref5.current) refInput.ref5.current.value = '';
    if (refInput.ref6.current) refInput.ref6.current.value = '';
    if (refInput.ref7.current) refInput.ref7.current.value = '';
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
            currentRef={refInput.ref1}
            nextRef={refInput.ref2}
          />
          <InputCode
            id={2}
            currentRef={refInput.ref2}
            nextRef={refInput.ref3}
          />
          <InputCode
            id={3}
            currentRef={refInput.ref3}
            nextRef={refInput.ref4}
          />
          <InputCode
            id={4}
            currentRef={refInput.ref4}
            nextRef={refInput.ref5}
          />
          <InputCode
            id={5}
            currentRef={refInput.ref5}
            nextRef={refInput.ref6}
          />
          <InputCode
            id={6}
            currentRef={refInput.ref6}
            nextRef={refInput.ref7}
          />
        </div>

        <div className='auth_reinit_title'>
          Entrez votre nouveau mot de passe
        </div>

        <div className='auth_reinit_input_container'>
          <div className='auth_reinit_input_icon'>
            <RiLockPasswordLine size={30} />
          </div>
          <input
            className='auth_reinit_input_value'
            type='password'
            name='reinit_password'
            id='reinit_password'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refPassword}
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          />
          <InputEye refInput={refPassword} />
          <div
            className='reinit_input_password_generate'
            onClick={() => {
              generate(refPassword);
            }}
          >
            Random Pass
          </div>
        </div>

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
