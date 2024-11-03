import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IoClose } from 'react-icons/io5';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import InputCode from '../../../auth/components/InputCode';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  email: string;
  setCode: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewEmail: FC<Props> = ({
  setMatchaNotif,
  email,
  setCode,
  setReloadAccount,
}) => {
  const nav = useNavigate();
  const [reqData, setReqData] = useState<{
    emailCode: string;
    email: string;
  } | null>(null);
  const refInput = {
    ref1: useRef<HTMLInputElement>(null),
    ref2: useRef<HTMLInputElement>(null),
    ref3: useRef<HTMLInputElement>(null),
    ref4: useRef<HTMLInputElement>(null),
    ref5: useRef<HTMLInputElement>(null),
    ref6: useRef<HTMLInputElement>(null),
    ref7: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReqData(null);
    if (
      refInput.ref1.current?.value === '' ||
      refInput.ref2.current?.value === '' ||
      refInput.ref3.current?.value === '' ||
      refInput.ref4.current?.value === '' ||
      refInput.ref5.current?.value === '' ||
      refInput.ref6.current?.value === ''
    ) {
      setMatchaNotif('Le code est incorrect');
      setCode(false);
      return;
    }
    const newCode: string = `${refInput.ref1.current?.value}${refInput.ref2.current?.value}${refInput.ref3.current?.value}${refInput.ref4.current?.value}${refInput.ref5.current?.value}${refInput.ref6.current?.value}`;
    if (!newCode || newCode.length !== 6) {
      setMatchaNotif('Le code est incorrect');
      setCode(false);
      return;
    }
    setReqData({ emailCode: newCode, email: email });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateValideEmail, {
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
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        Cookies.set('session', data.token, {
          expires: undefined,
          sameSite: 'None',
          secure: true,
        });
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
      <div className='email_up_container'>
        <div className='close'>
          <button
            onClick={() => {
              setCode(false);
            }}
          >
            <IoClose size={28} color='#fff' />
          </button>
        </div>
        <div className='email_up_title'>Entrez le code reçu par email</div>
        <form className='email_up_form' onSubmit={handleSubmit}>
          <div className='number'>
            <InputCode
              id={1}
              currentRef={refInput.ref1}
              nextRef={refInput.ref2}
            />
            <InputCode
              id={2}
              currentRef={refInput.ref2}
              nextRef={refInput.ref3}
            />
            <InputCode
              id={3}
              currentRef={refInput.ref3}
              nextRef={refInput.ref4}
            />
            <InputCode
              id={4}
              currentRef={refInput.ref4}
              nextRef={refInput.ref5}
            />
            <InputCode
              id={5}
              currentRef={refInput.ref5}
              nextRef={refInput.ref6}
            />
            <InputCode
              id={6}
              currentRef={refInput.ref6}
              nextRef={refInput.ref7}
            />
          </div>

          <input
            className='input_submit'
            type='submit'
            name='submit2'
            id='submit2'
            value='Envoyer'
          />
        </form>
      </div>
    </>
  );
};

export default NewEmail;
