import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, authRoute } from '../../appConfig/appPath';
import { emailValidation } from '../../utils/inputValidation';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import InputValidationIcons from '../../utils/InputValidationIcons';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ResendEmailForm: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const refEmail = useRef<HTMLInputElement>(null);
  const [validEmail, setValidEmail] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const handleSubmit = () => {
    const email = refEmail.current?.value.trim() || null;
    if (!email) return;
    if (!emailValidation(email)) {
      setValidEmail('invalid');
      setMatchaNotif("Le format de l'adresse email est invalide.");
      return;
    }
    setValidEmail('valid');
    setEmail(email);
  };

  const handleClear = () => {
    if (refEmail.current) refEmail.current.value = '';
    setValidEmail(null);
  };

  useEffect(() => {
    if (!email) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.resendEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
        });
        const data = await response.json();
        if (!isMounted) return;

        setMatchaNotif(data.message);
        if (response.status === 500) {
          nav(appRedir.errorInternal);
          return;
        }

        setEmail(null);
        if (response.status !== 200) {
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
  }, [email]);

  return (
    <>
      <div className='form_container'>
        <div className='form_row'>
          <div className='form_icon'>
            <MdOutlineAlternateEmail size={25} color='#444444' />
          </div>
          <input
            className='form_input'
            onClick={() => {
              setValidEmail(null);
            }}
            type='email'
            name='email'
            id='email'
            required
            autoComplete='email'
            ref={refEmail}
            placeholder='example@email.fr'
          />
          <div className='form_end_container'>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'></div>
            <div className='form_end_icon_container'>
              <InputValidationIcons state={validEmail} type='email' />
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
            value='Envoyer'
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
  );
};

export default ResendEmailForm;
