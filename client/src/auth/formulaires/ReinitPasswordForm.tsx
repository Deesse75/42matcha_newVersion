import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCode from '../components/InputCode';
import { authRoute, appRedir } from '../../appConfig/appPath';
import WaitChargement from '../../utils/WaitChargement';
import { IoCodeWorkingOutline } from 'react-icons/io5';
import { passwordValidation } from '../../utils/inputValidation';
import InputValidationIcons from '../../utils/InputValidationIcons';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputEye from '../../utils/InputEye';
import GeneratePassword from '../../utils/GeneratePassword';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setValidRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReinitPasswordForm: FC<Props> = ({ setMatchaNotif, setValidRequest }) => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState<string | null>(null);
  const [validPassword, setValidPassword] = useState<string | null>(null);
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
  const [bodyRequest, setBodyRequest] = useState<{
    code: string;
    newPassword: string;
    email: string;
  } | null>(null);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code1 = refInputCode?.ref1?.current?.value ?? '';
    const code2 = refInputCode?.ref2?.current?.value ?? '';
    const code3 = refInputCode?.ref3?.current?.value ?? '';
    const code4 = refInputCode?.ref4?.current?.value ?? '';
    const code5 = refInputCode?.ref5?.current?.value ?? '';
    const code6 = refInputCode?.ref6?.current?.value ?? '';
    if (!code1 || !code2 || !code3 || !code4 || !code5 || !code6) {
      setMatchaNotif('Code invalide, veuillez renseigner tous les champs.');
      return;
    }
    const code = code1 + code2 + code3 + code4 + code5 + code6;
    if (validPassword === 'invalid') {
      setMatchaNotif('Le format du mot de passe est invalide.');
      return;
    }
    if (!email) {
      setMatchaNotif(
        'Une erreur est survenue. Veuillez effectuer une nouvelle demande.',
      );
      setValidRequest(false);
      return;
    }
    if (!password) {
      setMatchaNotif('Le format du mot de passe est invalide.');
      return;
    }
    setBodyRequest({
      code: code,
      newPassword: password,
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
    setValidEmail(null);
    setValidPassword(null);
  };

  useEffect(() => {
    if (email && validEmail === 'valid') return;
    const handleCheckEmail = () => {
      const email = localStorage.getItem('email') || null;
      localStorage.removeItem('email');
      if (!email) {
        setMatchaNotif(
          'Une erreur est survenue. Veuillez effectuer une nouvelle demande.',
        );
        setValidRequest(false);
        return;
      }
      setValidEmail('valid');
      setEmail(email);
    };
    handleCheckEmail();
  }, []);

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.reinitPassword, {
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

        if (response.status !== 200) {
          setValidRequest(false);
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
      {validEmail === 'valid' ? (
        <>
          <div className='auth_form_container'>
            <form onSubmit={handleSubmit} className='auth_form'>
              <div className='auth_form_row'>
                <div className='auth_form_icon'>
                  <IoCodeWorkingOutline size={25} color='#444444' />
                </div>
                <div className='auth_form_input_reinit'>
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
                  placeholder='Nouveau mot de passe'
                />
                <div className='auth_form_end_container'>
                  <div className='auth_form_end_icon_container'>
                    <InputEye refPassword={refPassword} />
                  </div>
                  <div className='auth_form_end_icon_container'>
                    <GeneratePassword refPassword={refPassword} />
                  </div>
                  <div className='auth_form_end_icon_container'>
                    <InputValidationIcons
                      state={validPassword}
                      type='password'
                    />
                  </div>
                </div>
              </div>
              <div className='auth_submit'>
                <input
                  className='auth_submit_button'
                  type='submit'
                  name='authSubmit'
                  id='authSubmit'
                  value='Valider'
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
      ) : (
        <>
          <WaitChargement text='Chargement de la page ...' />
        </>
      )}
    </>
  );
};

export default ReinitPasswordForm;
