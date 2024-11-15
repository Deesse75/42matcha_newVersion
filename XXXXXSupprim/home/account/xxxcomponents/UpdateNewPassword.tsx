import { FC, useRef, useState } from 'react';
import GeneratePassword from '../../../../utils/GeneratePassword';
import InputEye from '../../../../utils/InputEye';

type Props = {
  setUpdatePassword: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateNewPassword: FC<Props> = ({
  setUpdatePassword,
  setReloadAccount,
  setMatchaNotif,
}) => {
  const [codeIsValid, setCodeIsValid] = useState<boolean>(false);
  const refCurrentPassword = useRef<HTMLInputElement>(null);
  const refNewPassword = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className='account_data_password_new'>
        <div className='account_data_password_new_title'>
          Entrer le code reçu par email
        </div>
        <EmailCodevalidate
          setCodeIsValid={setCodeIsValid}
          setMatchaNotif={setMatchaNotif}
        />
        {codeIsValid && (
          <>
            <div className='account_input_name'>
              Entrer le mot de passe actuel
            </div>
            <div className='account_input_password_container'>
              <input
                className='account_input_password_value'
                type='password'
                name='currentPassword'
                id='currentPassword'
                maxLength={8}
                minLength={30}
                autoComplete='off'
                ref={refCurrentPassword}
                placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
              />
              <GeneratePassword
                refPassword={refCurrentPassword}
                display={false}
              />
              <InputEye refInput={refCurrentPassword} display={true} />
            </div>
            <div className='account_input_name'>
              Entrer le nouveau mot de passe
            </div>
            <div className='account_input_password_container'>
              <input
                className='account_input_password_value'
                type='password'
                name='newPassword'
                id='newPassword'
                maxLength={8}
                minLength={30}
                autoComplete='off'
                ref={refNewPassword}
                placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
              />
              <GeneratePassword refPassword={refNewPassword} display={true} />
              <InputEye refInput={refNewPassword} display={true} />
            </div>
            <div className='account_input_submit'>
              <button>Modifier</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateNewPassword;
