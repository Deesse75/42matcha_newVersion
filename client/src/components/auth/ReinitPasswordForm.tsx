import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedir } from '../../appConfig/appPath';
import { IoCodeWorkingOutline } from 'react-icons/io5';
import { passwordValidation } from '../../utils/inputValidation';
import InputValidationIcons from '../../utils/InputValidationIcons';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputEye from '../../utils/InputEye';
import GeneratePassword from '../../utils/GeneratePassword';
import PageChargement from '../../utils/chargement/PageChargement';

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

  const handleSubmit = () => {
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
          <div className='form_container'>
            <div className='reinit_row'>
              <div className='reinit_icon'>
                <IoCodeWorkingOutline size={25} color='#444444' />
              </div>
              <div className='reinit_input'>
                <input
                  className='reinit_number'
                  type='text'
                  name='num1'
                  id='num1'
                  placeholder='_'
                  maxLength={1}
                  minLength={1}
                  autoFocus
                  ref={refInputCode.ref1}
                  autoComplete='off'
                  onChange={() => {
                    refInputCode.ref2.current?.focus();
                  }}
                />
                <input
                  className='reinit_number'
                  type='text'
                  name='num2'
                  id='num2'
                  placeholder='_'
                  maxLength={1}
                  minLength={1}
                  ref={refInputCode.ref2}
                  autoComplete='off'
                  onChange={() => {
                    refInputCode.ref3.current?.focus();
                  }}
                />
                <input
                  className='reinit_number'
                  type='text'
                  name='num3'
                  id='num3'
                  placeholder='_'
                  maxLength={1}
                  minLength={1}
                  ref={refInputCode.ref3}
                  autoComplete='off'
                  onChange={() => {
                    refInputCode.ref4.current?.focus();
                  }}
                />
                <input
                  className='reinit_number'
                  type='text'
                  name='num4'
                  id='num4'
                  placeholder='_'
                  maxLength={1}
                  minLength={1}
                  ref={refInputCode.ref4}
                  autoComplete='off'
                  onChange={() => {
                    refInputCode.ref5.current?.focus();
                  }}
                />
                <input
                  className='reinit_number'
                  type='text'
                  name='num5'
                  id='num5'
                  placeholder='_'
                  maxLength={1}
                  minLength={1}
                  ref={refInputCode.ref5}
                  autoComplete='off'
                  onChange={() => {
                    refInputCode.ref6.current?.focus();
                  }}
                />
                <input
                  className='reinit_number'
                  type='text'
                  name='num6'
                  id='num6'
                  placeholder='_'
                  maxLength={1}
                  minLength={1}
                  ref={refInputCode.ref6}
                  autoComplete='off'
                  onChange={() => {
                    refInputCode.ref7.current?.focus();
                  }}
                />
              </div>
            </div>
            <div className='form_row'>
              <div className='form_icon'>
                <RiLockPasswordLine size={25} color='#444444' />
              </div>
              <input
                className='form_input'
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
              <div className='form_end_container'>
                <div className='form_end_icon_container'>
                  <InputEye refPassword={refPassword} />
                </div>
                <div className='form_end_icon_container'>
                  <GeneratePassword refPassword={refPassword} />
                </div>
                <div className='form_end_icon_container'>
                  <InputValidationIcons state={validPassword} type='password' />
                </div>
              </div>
            </div>
            <div className='form_submit'>
              <input
                className='form_submit_button'
                onClick={handleSubmit}
                type='submit'
                name='authSubmit'
                id='authSubmit'
                value='Valider'
              />
              <input
                className='form_submit_button'
                type='button'
                name='authClear'
                id='authClear'
                value='Effacer'
                onClick={handleClear}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <PageChargement />
        </>
      )}
    </>
  );
};

export default ReinitPasswordForm;
