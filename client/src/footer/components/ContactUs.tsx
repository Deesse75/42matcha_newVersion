import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, authRoute } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ContactUs: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const menu = useSelectMenu();
  const refUsername = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refSubject = useRef<HTMLInputElement>(null);
  const refArea = useRef<HTMLTextAreaElement>(null);
  const [session, setSession] = useState<string | null>(null);
  const [bodyRequest, setBodyRequest] = useState<{
    contactName: string;
    contactEmail: string;
    subject: string;
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = refUsername.current?.value.trim() || null;
    const email = refEmail.current?.value.trim() || null;
    const subject = refSubject.current?.value.trim() || null;
    const text = refArea.current?.value.trim() || null;
    if (!username || !email || !subject || !text) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    setBodyRequest({
      contactName: username,
      contactEmail: email,
      subject: subject,
      text: text,
    });
  };

  const handleClear = () => {
    if (refUsername.current) refUsername.current.value = '';
    if (refEmail.current) refEmail.current.value = '';
    if (refSubject.current) refSubject.current.value = '';
    if (refArea.current) refArea.current.value = '';
  };

  useEffect(() => {
    const session = Cookies.get('session') || null;
    setSession(session);
    if (session) menu.setDisplayAppMenu(true);
    else menu.setDisplayAppMenu(false);
  }, []);

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(authRoute.contactUs, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyRequest),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          setBodyRequest(null);
          return;
        }
        if (session) nav(appRedir.account);
        else nav(appRedir.signin);
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
      <div className='contact_page'>
        <div className='contact_title'>Contact</div>
        <form className='contact_form' onSubmit={handleSubmit}>
          <div className='contact_form_row'>
            <input
              className='contact_form_input'
              type='text'
              name='username'
              id='username'
              maxLength={30}
              minLength={3}
              required
              autoComplete='username'
              ref={refUsername}
              placeholder='Entrez votre nom'
            />
          </div>
          <div className='contact_form_row'>
            <input
              className='contact_form_input'
              type='email'
              name='email'
              id='email'
              required
              autoComplete='email'
              ref={refEmail}
              placeholder='Entrez une adresse email'
            />
          </div>
          <div className='contact_form_row'>
            <input
              className='contact_form_input'
              type='text'
              name='subject'
              id='subject'
              required
              autoComplete='off'
              minLength={1}
              maxLength={100}
              placeholder="Entrez l'objet de votre message"
              ref={refSubject}
            />
          </div>
          <div className='contact_form_row'>
            <textarea
              className='contact_form_area'
              name='area'
              id='area'
              required
              autoComplete='off'
              minLength={1}
              maxLength={955}
              ref={refArea}
              placeholder='Entrez votre message'
            ></textarea>
          </div>
          <div className='contact_form_button'>
            <input
              type='submit'
              name='contactSubmit'
              id='contactSubmit'
              value='Envoyer'
            />
            <input
              type='button'
              name='contactClear'
              id='contactClear'
              value='Effacer'
              onClick={handleClear}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
