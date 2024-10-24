import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir, mailerRoute } from '../../appConfig/appPath';
import Cookies from 'js-cookie';

type ReqDataType = {
  contactName: string;
  contactEmail: string;
  subject: string;
  text: string;
};

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ContactUs: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [reqData, setReqData] = useState<ReqDataType | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Check user entries
    const contactName = e.currentTarget!.contactName.value.trim();
    const contactEmail = e.currentTarget!.contactEmail.value.trim();
    const subject = e.currentTarget!.subject.value.trim();
    const text = e.currentTarget!.text.value.trim();
    if (!contactName || !contactEmail || !subject || !text) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }

    //If all is good, set the request data
    setReqData({
      contactName: contactName,
      contactEmail: contactEmail,
      subject: subject,
      text: text,
    });
  };

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      setMatchaNotif('Votre session a expiré, le site a redemarré.');
      nav(appRedir.loading);
      return;
    }
  }, []);

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(mailerRoute.contactUs, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqData),
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
          setReqData(null);
          return;
        }
        if (Cookies.get('session')) {
          nav(appRedir.getMe);
        } else {
          nav(appRedir.loading);
        }
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
  }, [reqData]);

  return (
    <>
      <div className='contact_page'>
        <div className='contact_left'>
          <div className='contact_title'>Contact</div>
          <form className='contact_form' onSubmit={handleSubmit}>
            <div className='contact_data'>
              <div className='contact_label'>Intitulé :</div>
              <input
                className='contact_data_input'
                type='text'
                name='contactName'
                id='contactName'
                autoComplete='username'
                max={30}
                min={3}
                required
                placeholder='Entrez votre nom ou pseudo'
              />
            </div>
            <div className='contact_data'>
              <div className='contact_label'>Email :</div>
              <input
                className='contact_data_input'
                type='email'
                name='contactEmail'
                id='contactEmail'
                autoComplete='email'
                required
                placeholder='Entrez votre adresse email'
              />
            </div>
            <div className='contact_data'>
              <div className='contact_label'>Objet :</div>
              <input
                className='contact_data_input'
                type='text'
                name='subject'
                id='subject'
                required
                autoComplete='off'
                min={1}
                max={100}
                placeholder="Entrez l'objet de votre message"
              />
            </div>
            <div className='contact_data_area'>
              <div className='contact_label'>Message :</div>
              <textarea
                className='contact_area'
                name='area'
                id='area'
                required
                autoComplete='off'
                minLength={1}
                maxLength={955}
                placeholder='Entrez votre message'
              ></textarea>
            </div>
            <div className='contact_button'>
              <input
                type='submit'
                name='submit'
                id='submit'
                value='Envoyer le message'
              />
              <input
                onClick={() => {
                  Cookies.get('session')
                    ? nav(appRedir.getMe)
                    : nav(appRedir.loading);
                }}
                type='button'
                name='back'
                id='back'
                value="Retour à l'accueil"
              />
            </div>
          </form>
        </div>
        <div className='contact_img'>
          <img
            src='/background/vecteezy_vector-feather-isolated-on-white-background_6297846.jpg'
            alt=''
          />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
