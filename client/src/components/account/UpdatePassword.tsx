import { FC, useEffect, useRef, useState } from 'react';
import GeneratePassword from '../../utils/GeneratePassword';
import InputEye from '../../utils/InputEye';
import { appRedir, userRoute } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { passwordValidation } from '../../utils/inputValidation';
import InputValidationIcons from '../../utils/InputValidationIcons';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdatePassword: FC<Props> = ({ setMatchaNotif }) => {
  const refNewPassword = useRef<HTMLInputElement>(null);
  const refCurrentPassword = useRef<HTMLInputElement>(null);
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [validCurrentPassword, setValidCurrentPassword] = useState<
    string | null
  >(null);
  const [validNewPassword, setValidNewPassword] = useState<string | null>(null);
  const nav = useNavigate();
  const [bodyRequest, setBodyRequest] = useState<{
    currentPassword: string;
    newPassword: string;
  } | null>(null);

  const handleCheckCurrentPassword = () => {
    const password = refCurrentPassword.current?.value || null;
    if (!password) return;
    if (!passwordValidation(password)) {
      setValidCurrentPassword('invalid');
      setMatchaNotif('Le format du mot de passe actuel est invalide.');
      return;
    }
    setValidCurrentPassword('valid');
    setCurrentPassword(password);
  };

  const handleCheckNewPassword = () => {
    const password = refNewPassword.current?.value || null;
    if (!password) return;
    if (!passwordValidation(password)) {
      setValidNewPassword('invalid');
      setMatchaNotif('Le format du nouveau mot de passe est invalide.');
      return;
    }
    setValidNewPassword('valid');
    setNewPassword(password);
  };

  const handleSubmit = () => {
    if (validCurrentPassword === 'invalid') {
      setMatchaNotif('Le format du mot de passe actuel est invalide.');
      return;
    }
    if (validNewPassword === 'invalid') {
      setMatchaNotif('Le format du nouveau mot de passe est invalide.');
      return;
    }
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
    setBodyRequest({
      currentPassword: currentPassword,
      newPassword: newPassword,
    });
  };

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
        setValidCurrentPassword(null);
        setValidNewPassword(null);
        if (response.status !== 200) {
          return;
        }
        refCurrentPassword.current!.value = '';
        refNewPassword.current!.value = '';
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
          <input
            className='update_password_one_input'
            onBlur={handleCheckCurrentPassword}
            onClick={() => {
              setValidCurrentPassword(null);
            }}
            type='password'
            name='currentPassword'
            id='currentPassword'
            placeholder='Mot de passe actuel'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refCurrentPassword}
          />
          <div className='update_password_end'>
            <div className='update_password_end_icon'>
              <InputEye refPassword={refCurrentPassword} />
            </div>
            <div className='update_password_end_icon'></div>
            <div className='update_password_end_icon'>
              <InputValidationIcons
                state={validCurrentPassword}
                type='password'
              />
            </div>
          </div>
        </div>
        <div className='update_password_one'>
          <input
            className='update_password_one_input'
            onBlur={handleCheckNewPassword}
            onClick={() => {
              setValidNewPassword(null);
            }}
            type='password'
            name='newPassword'
            id='newPassword'
            placeholder='Nouveau mot de passe'
            maxLength={30}
            minLength={8}
            required
            autoComplete='off'
            ref={refNewPassword}
          />
          <div className='update_password_end'>
            <div className='update_password_end_icon'>
              <InputEye refPassword={refNewPassword} />
            </div>
            <div className='update_password_end_icon'>
              <GeneratePassword refPassword={refNewPassword} />
            </div>
            <div className='update_password_end_icon'>
              <InputValidationIcons state={validNewPassword} type='password' />
            </div>
          </div>
        </div>

        <div className='update_password_submit'>
          <button
            className='update_password_submit_button'
            onClick={handleSubmit}
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
