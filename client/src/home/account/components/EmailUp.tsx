import React, { useRef, useState, useEffect, FC } from 'react';
import Cookies from 'js-cookie';
import { MdDeleteOutline } from 'react-icons/md';
import { LuSave } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import NewEmail from './NewEmail';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import { useUserInfo } from '../../../appContext/user.context';
import { emailValidation } from '../../../utils/inputValidation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmailUp: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const [code, setCode] = useState<boolean>(false);
  const [reqData, setReqData] = useState<{ email: string } | null>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const handleClick = () => {
    //Check user entries
    const newEmailValue = refEmail!.current?.value.trim() || '';
    const oldEmail = me?.user ? me.user.email : '';
    if (!newEmailValue) return;
    if (newEmailValue === oldEmail) {
      setMatchaNotif(
        "La nouvelle adresse email est identique à l'adresse email actuelle.",
      );
      return;
    }
    if (!emailValidation(newEmailValue)) {
      setMatchaNotif("Le format de l'adresse email est invalide.");
      return;
    }

    //If all is good, set the request data
    setReqData({ email: newEmailValue });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateEmail, {
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
        setMatchaNotif(data.message);
        setReqData(null);
        if (response.status !== 200) return;
        refEmail.current!.value = '';
        setCode(true);
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
      {code && (
        <>
          <NewEmail
            setMatchaNotif={setMatchaNotif}
            email={reqData ? reqData.email : ''}
            setCode={setCode}
            setReloadAccount={setReloadAccount}
          />
        </>
      )}
      <div className='data_container'>
          <div className='data_name'>Email : </div>
          <div className='data_current_value'>{me?.user ? me.user.email : ''}</div>
        <div className='data_new_value'>
          <input
            className='data_input'
            onFocus={() => {
              setCode(false);
            }}
            type='text'
            name='email'
            id='email'
            autoComplete='email'
            placeholder='Nouvelle adresse email'
            ref={refEmail}
          />
          <div className='data_icons'>
            <div className='icon' onClick={handleClick}>
              <LuSave size={25} color='#157003' />
            </div>
            <div
              className='icon'
              onClick={() => {
                refEmail.current?.value && (refEmail.current.value = '');
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

export default EmailUp;
