import { FC, useEffect, useRef, useState } from 'react';
import { useUserInfo } from '../../../../appContext/user.context';
import { IoReload } from 'react-icons/io5';
import convertDate from '../../../../utils/convertDate';
import AuthInputIsValid from '../../../../auth/components/AuthInputIsValid';
import { MdDeleteOutline } from 'react-icons/md';
import { LuSave } from 'react-icons/lu';
import inputValidation from '../../../../utils/inputValidation';
import { appRedir, userRoute } from '../../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export type BodyRequestType = {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  birthdate: string | null;
};

type Props = {
  inputName: string;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccountUpdateContainer: FC<Props> = ({
  inputName,
  setReloadAccount,
  setMatchaNotif,
}) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const refInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [bodyRequest, setBodyRequest] = useState<BodyRequestType>({
    firstname: null,
    lastname: null,
    username: null,
    birthdate: null,
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleClick = () => {
    if (!me.user) {
      setReloadAccount(true);
      return;
    }
    const newValue = refInput!.current?.value.trim();
    if (!newValue) {
      setMatchaNotif(`Le champs est vide.`);
      return;
    }
    if (!inputValidation(inputName, newValue)) {
      setIsInvalid(true);
      setIsValid(false);
      setMatchaNotif(`Le format du champs est invalide.`);
      return;
    }
    setIsInvalid(false);
    setIsValid(true);
    setBodyRequest({ ...bodyRequest, [inputName]: newValue });
  };

  useEffect(() => {
    if (url) return;
    if (inputName === 'birthdate') setUrl(userRoute.updateBirthdate);
    else setUrl(userRoute.updateName);
  }, [url]);

  useEffect(() => {
    if (!url || url === 'error' || !bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(url, {
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
        setBodyRequest({
          firstname: null,
          lastname: null,
          username: null,
          birthdate: null,
          email: null,
        });
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        refInput.current!.value = '';
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
  }, [bodyRequest, url]);

  return (
    <>
      <div className='account_input_container'>
        {me.user ? (
          <>
            <div className='account_input_current'>
              {inputName === 'firstname' && (
                <>
                  <div className='account_input_current_name'>Prénom</div>
                  <div className='account_input_current_value'>
                    {me.user.firstname}
                  </div>
                </>
              )}
              {inputName === 'lastname' && (
                <>
                  <div className='account_input_current_name'>Nom</div>
                  <div className='account_input_current_value'>
                    {me.user.lastname}
                  </div>
                </>
              )}
              {inputName === 'username' && (
                <>
                  <div className='account_input_current_name'>Pseudo</div>
                  <div className='account_input_current_value'>
                    {me.user.username}
                  </div>
                </>
              )}
              {inputName === 'birthdate' && (
                <>
                  <div className='account_input_current_name'>
                    Date de naissance
                  </div>
                  <div className='account_input_current_value'>
                    {convertDate(me.user.birthdate)}
                  </div>
                </>
              )}
              {inputName === 'email' && (
                <>
                  <div className='account_input_current_name'>Email</div>
                  <div className='account_input_current_value'>
                    {me.user.email}
                  </div>
                </>
              )}
            </div>
            <div className='account_input_new'>
              <input
                className='account_input_new_value'
                type={inputType}
                name={inputName}
                id={inputName}
                autoComplete={autoComplete}
                ref={refInput}
                placeholder={placeholder}
              />
              <AuthInputIsValid
                isValid={isValid}
                isInvalid={isInvalid}
                type={inputName}
              />
            </div>

            <div className='account_input_submit'>
              <div className='account_input_submit_icon' onClick={handleClick}>
                <LuSave size={25} color='#157003' />
              </div>
              <div
                className='account_input_submit_icon'
                onClick={() => {
                  refInput.current?.value && (refInput.current.value = '');
                }}
              >
                <MdDeleteOutline size={30} color='red' />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='account_input_error'>Erreur chargement</div>
            <div
              className='account_input_error_icon'
              onClick={() => {
                setReloadAccount(true);
              }}
            >
              <IoReload />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AccountUpdateContainer;
