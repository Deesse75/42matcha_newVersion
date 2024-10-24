import { useRef, useState, useEffect, FC } from 'react';
import Cookies from 'js-cookie';
import { LuSave } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import { useUserInfo } from '../../../appContext/user.context';
import { usernameValidation } from '../../../utils/inputValidation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const UsernameUp: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const refUsername = useRef<HTMLInputElement>(null);
  const [reqData, setReqData] = useState<{
    username: string;
  } | null>(null);
  const nav = useNavigate();

  const handleClick = () => {
    //Check user entries
    const usernameValue = refUsername.current?.value.trim();
    if (!usernameValue) return;
    const currentUsername = me?.user ? me.user.username : '';
    if (usernameValue === currentUsername) {
      setMatchaNotif(
        "Le nouveau nom d'utilisateur est identique au nom d'utilisateur actuel.",
      );
      return;
    }
    if (!usernameValidation(usernameValue)) {
      setMatchaNotif("Le format du nom d'utilisateur est invalide.");
      return;
    }
    setReqData({ username: usernameValue });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateName, {
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
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        refUsername.current!.value = '';
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
      <div className='data_container'>
          <div className='data_name'>Pseudo : </div>
          <div className='data_current_value'>{me?.user ? me.user.username : ''}</div>
        <div className='data_new_value'>
          <input
            className='data_input'
            type='text'
            name='username'
            id='username'
            maxLength={30}
            minLength={3}
            autoComplete='username'
            placeholder='Nouveau pseudo'
            ref={refUsername}
          />
          <div className='data_icons'>
            <div className='icon' onClick={handleClick}>
              <LuSave size={25} color='#157003' />
            </div>
            <div
              className='icon'
              onClick={() => {
                refUsername.current?.value && (refUsername.current.value = '');
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

export default UsernameUp;
