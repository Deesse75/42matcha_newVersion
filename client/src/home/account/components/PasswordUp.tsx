import { useRef, useState, useEffect, FC } from 'react';
import Cookies from 'js-cookie';
import { MdDeleteOutline } from 'react-icons/md';
import { LuSave } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import generate from '../../../utils/generate';
import InputEye from '../../../auth/components/InputEye';
import { passwordValidation } from '../../../utils/inputValidation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordUp: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const refNewPassword = useRef<HTMLInputElement>(null);
  const refCurrentPassword = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [reqData, setReqData] = useState<{
    currentPassword: string;
    newPassword: string;
  } | null>(null);

  const handleClick = () => {
    //Check user entries
    const currentPassword = refCurrentPassword!.current?.value.trim();
    const newPassword = refNewPassword!.current?.value.trim();
    if (!currentPassword || !newPassword) {
      setMatchaNotif('Tous les champs sont requis.');
      return;
    }
    if (currentPassword === newPassword) {
      setMatchaNotif(
        'Le nouveau mot de passe doit être différent du mot de passe actuel.',
      );
      return;
    }
    if (!passwordValidation(currentPassword)) {
      setMatchaNotif('Le format du mot de passe actuel est invalide.');
      return;
    }
    if (!passwordValidation(newPassword)) {
      setMatchaNotif('Le format du nouveau mot de passe est invalide.');
      return;
    }

    //If all is good, set the request data
    setReqData({
      currentPassword: currentPassword,
      newPassword: newPassword,
    });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updatePassword, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(reqData),
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
        setReqData(null);
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          return;
        }
        refCurrentPassword.current!.value = '';
        refNewPassword.current!.value = '';
        setReloadAccount(true);
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
      <div className='data_container pass_container'>
        <div className='pass_part'>
          <div className='data_name pass_name'>Mot de passe actuel : </div>
          <div className='data_new_value pass_new_value'>
            <input
              className='data_input pass_input'
              type='password'
              name='password1'
              id='password1'
              maxLength={30}
              minLength={8}
              autoComplete='off'
              ref={refCurrentPassword}
              placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            />
            <InputEye refInput={refCurrentPassword} />
          </div>
        </div>

        <div className='pass_part'>
          <div className='data_name pass_name'>Nouveau mot de passe : </div>
          <div className='data_new_value pass_new_value'>
            <input
              className='data_input pass_input'
              type='password'
              name='password2'
              id='password2'
              maxLength={30}
              minLength={8}
              autoComplete='off'
              ref={refNewPassword}
              placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            />
            <div
              className='generate'
              onClick={() => {
                generate(refNewPassword);
              }}
            >
              Random Pass
            </div>
            <InputEye refInput={refNewPassword} />
          </div>
          <div className='data_icons pass_icons'>
            <div className='icon' onClick={handleClick}>
              <LuSave size={25} color='#157003' />
            </div>
            <div
              className='icon'
              onClick={() => {
                refNewPassword.current?.value &&
                  (refNewPassword.current.value = '');
                refCurrentPassword.current?.value &&
                  (refCurrentPassword.current.value = '');
              }}
            >
              <MdDeleteOutline size={30} color='red' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordUp;
