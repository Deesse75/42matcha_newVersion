import { FC, useEffect, useRef, useState } from 'react';
import GeneratePassword from '../../../utils/GeneratePassword';
import InputEye from '../../../utils/InputEye';
import Cookies from 'js-cookie';
import { appRedir, userRoute } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import { useSelectMenu } from '../../../appContext/selectMenu.context';
import { useUserInfo } from '../../../appContext/user.context';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdatePassword: FC<Props> = ({ setMatchaNotif }) => {
  const refNewPassword = useRef<HTMLInputElement>(null);
  const refActivePassword = useRef<HTMLInputElement>(null);
  const [bodyRequest, setBodyRequest] = useState<{
    activePassword: string;
    newPassword: string;
  } | null>(null);
  const nav = useNavigate();
  const menu = useSelectMenu();
  const me = useUserInfo();

  const handleClick = () => {};

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
        const response = await fetch(userRoute.updatePassword, {
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
        nav(appRedir.account);
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
      <div className='update_password_container'>
        <div className='update_password_title'>Modifier votre mot de passe</div>
        <div className='update_password_one'>
          <div className='update_password_one_title'>Mot de passe actuel</div>
          <input
            type='password'
            name='activePassword'
            id='activePassword'
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refActivePassword}
          />
          <InputEye refInput={refActivePassword} display={true} />
        </div>
        <div className='update_password_one'>
          <div className='update_password_one_title'>Nouveau mot de passe</div>
          <input
            type='password'
            name='newPassword'
            id='newPassword'
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refNewPassword}
          />
          <InputEye refInput={refNewPassword} display={true} />
          <GeneratePassword display={true} refPassword={refNewPassword} />
        </div>
        <button onClick={handleClick}>Modifier</button>
      </div>
    </>
  );
};

export default UpdatePassword;
