import { FC, useEffect, useRef, useState } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { emailValidation } from '../../utils/inputValidation';
import { appRedir, authRoute } from '../../appConfig/appPath';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthResendForm: FC<Props> = ({ setSystemNotif }) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  const handleClick = () => {
    const email = refEmail.current?.value.trim() || null;

    if (!email) {
      setSystemNotif("Veuillez remplir l'adresse email.");
      return;
    }
    if (!emailValidation(email)) {
      setSystemNotif(
        "Le format de l'adresse email est invalide. Voir règles de saisie de formulaire en bas de page.",
      );
      return;
    }
    setEmail(email);
  };

  const handleClear = () => {
    if (refEmail.current) refEmail.current.value = '';
  };

  useEffect(() => {
    if (!email) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.resendLinkEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
        });
        const data = await response.json();
        if (!isMounted) return;

        setSystemNotif(data.message);
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
        setSystemNotif((error as Error).message);
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
      <div className='auth_resend_form'>
        <div className='auth_resend_input_container'>
          <div className='auth_resend_input_icon'>
            <MdOutlineAlternateEmail size={30} />
          </div>
          <input
            className='auth_resend_input_value'
            type='email'
            name='resend_email'
            id='resend_email'
            required
            autoComplete='email'
            ref={refEmail}
            placeholder='Adresse email'
          />
        </div>

        <div className='auth_submit'>
          <button onClick={handleClick} className='auth_submit_button'>
            Envoyer
          </button>
          <button onClick={handleClear} className='auth_submit_button'>
            Effacer
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthResendForm;
