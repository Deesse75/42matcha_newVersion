import { FC, useEffect, useRef, useState } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { emailValidation } from '../../../../../utils/functions/inputValidation';
import { appRedir, authRoute } from '../../../../../utils/config/appPath';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthForgotForm: FC<Props> = ({ setSystemNotif, setEmail }) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const nav = useNavigate();

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
          body: JSON.stringify({ email: currentEmail }),
        });
        const data = await response.json();
        if (!isMounted) return;

        if (response.status === 500) {
          setSystemNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }

        setSystemNotif(data.message);
        if (response.status !== 200) {
          setEmail(null);
          return;
        }
        setEmail(currentEmail);
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
  }, [currentEmail]);

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
            placeholder='adresse_email@exemple.fr'
          />
        </div>

        <div className='auth_submit'>
          <button
            onClick={handleClick}
            className='auth_submit_button'
          >
            Connexion
          </button>
          <button
            onClick={handleClear}
            className='auth_submit_button'
          >
            Effacer
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForgotForm;