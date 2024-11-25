import { FC, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import InputValidationIcons from '../../utils/InputValidationIcons';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { emailValidation } from '../../utils/inputValidation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateEmail: FC<Props> = ({ setMatchaNotif }) => {
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

  useEffect(() => {
    if (!email) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateEmail, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ newEmailk: email }),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setEmail(null);
        setValidEmail(null);
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          return;
        }
        refEmail.current!.value = '';
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
      <div className='update_email_container'>
        <div className='update_email_title'>Modifier votre adresse email</div>
        <div className='update_email_one'>
          <input
            className='update_email_one_input'
            type='email'
            name='email'
            id='email'
            placeholder='Nouvelle adresse email'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refEmail}
          />
          <div className='update_email_end'>
            <div className='update_email_end_icon'></div>
            <div className='update_email_end_icon'></div>
            <div className='update_email_end_icon'>
              <InputValidationIcons state={validEmail} type='email' />
            </div>
          </div>
        </div>

        <div className='update_email_submit'>
          <button className='update_email_submit_button' onClick={handleSubmit}>
            Mettre à jour
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateEmail;
