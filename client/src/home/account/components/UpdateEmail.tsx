import { FC, useEffect, useRef, useState } from 'react';
import InputEye from '../../../utils/InputEye';
import Cookies from 'js-cookie';
import { useUserInfo } from '../../../appContext/user.context';
import { useSelectMenu } from '../../../appContext/selectMenu.context';
import { appRedir, userRoute } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import {
  emailValidation,
  passwordValidation,
} from '../../../utils/inputValidation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateEmail: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const menu = useSelectMenu();
  const nav = useNavigate();
  const refCurrentPassword = useRef<HTMLInputElement>(null);
  const refNewEmail = useRef<HTMLInputElement>(null);
  const [bodyRequest, setBodyRequest] = useState<{
    currentPassword: string | null;
    newEmail: string | null;
  } | null>(null);

  const handleSubmit = () => {
    const currentPassword = refCurrentPassword.current?.value.trim();
    const newEmail = refNewEmail.current?.value.trim();
    if (!currentPassword || !newEmail) {
      setMatchaNotif('Veuillez remplir tous les champs.');
      return;
    }
    if (!emailValidation(newEmail)) {
      setMatchaNotif("Le format de l'adresse email est invalide.");
      return;
    }
    if (!passwordValidation(currentPassword)) {
      setMatchaNotif('Le format du mot de passe est invalide.');
      return;
    }
    setBodyRequest({
      currentPassword: currentPassword,
      newEmail: newEmail,
    });
  };

  useEffect(() => {
    if (!Cookies.get('matchaOn')) {
      menu.setAllMenuOff();
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get('session') || !me.user) {
      menu.setAllMenuOff();
      nav(appRedir.getMe);
      return;
    }
    menu.setOneMenuOn('account');
  }, []);

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateEmail, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(bodyRequest),
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
        setBodyRequest(null);
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          return;
        }
        refCurrentPassword.current!.value = '';
        refNewEmail.current!.value = '';
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
      <div className='update_email_container'>
        <div className='update_email_section'>
          <div className='update_email_section_title'>Mot de passe</div>
          <div className='update_email_section_current'>
            <input
              className='update_email_section_input'
              type='password'
              name='currentPassword'
              id='currentPassword'
              placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
              maxLength={30}
              minLength={8}
              ref={refCurrentPassword}
            />
            <InputEye refInput={refCurrentPassword} display={true} />
          </div>
        </div>
        <div className='update_email_section'>
          <div className='update_email_section_title'>
            Nouvelle adresse email
          </div>
          <div className='update_email_section_current'>
            <input
              className='update_email_section_input'
              type='email'
              name='newEmail'
              id='newEmail'
              ref={refNewEmail}
            />
          </div>
        </div>
        <button className='update_email_submit' onClick={handleSubmit}>
          Modifier
        </button>
      </div>
    </>
  );
};

export default UpdateEmail;
