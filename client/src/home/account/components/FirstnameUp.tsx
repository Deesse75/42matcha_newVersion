import { FC, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { LuSave } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import { useUserInfo } from '../../../appContext/user.context';
import { nameValidation } from '../../../utils/inputValidation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const FirstnameUp: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [reqData, setReqData] = useState<{ firstname: string } | null>(null);
  const refFirstname = useRef<HTMLInputElement>(null);

  const handleClick = () => {

    //Check user entries
    const firstnameValue = refFirstname!.current?.value.trim();
    if (!firstnameValue) return;
    const oldFirstname = me?.user ? me.user.firstname : '';
    if (firstnameValue === oldFirstname) {
      setMatchaNotif('Le nouveau prénom est identique au prénom actuel.');
      return;
    }
    if (!nameValidation(firstnameValue)) {
      setMatchaNotif('Le format du prénom est invalide.');
      return;
    }

    //If all is good, set the request data
    setReqData({ firstname: firstnameValue });
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
        refFirstname.current!.value = '';
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
        <div className='data_name'>Prénom : </div>
        <div className='data_current_value'>
          {me?.user ? me.user.firstname : ''}
        </div>
        <div className='data_new_value'>
          <input
            className='data_input'
            type='text'
            name='firstname'
            id='firstname'
            maxLength={30}
            minLength={3}
            autoComplete='given_name'
            placeholder='Nouveau prénom'
            ref={refFirstname}
          />
          <div className='data_icons'>
            <div className='icon' onClick={handleClick}>
              <LuSave size={25} color='#157003' />
            </div>
            <div
              className='icon'
              onClick={() => {
                refFirstname.current?.value &&
                  (refFirstname.current.value = '');
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

export default FirstnameUp;
