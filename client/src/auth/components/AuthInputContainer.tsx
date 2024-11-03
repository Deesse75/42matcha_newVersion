import { FC, useState } from 'react';
import { BsCalendar2Date } from 'react-icons/bs';
import {
  MdOutlineAlternateEmail,
  MdOutlineDriveFileRenameOutline,
} from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import GeneratePassword from './GeneratePassword';
import InputEye from './InputEye';
import inputValidation from '../../utils/inputValidation';
import AuthInputIsValid from './AuthInputIsValid';

export type ValideAuthInput = {
  firstname: boolean;
  lastname: boolean;
  username: boolean;
  birthdate: boolean;
  email: boolean;
  password: boolean;
};

type Props = {
  icon: string;
  inputType: string;
  inputName: string;
  max: number;
  min: number;
  autoComplete: string;
  refInput: React.RefObject<HTMLInputElement> | null;
  placeholder: string;
  displayEye: boolean;
  displayGen: boolean;
  valideInput: ValideAuthInput;
  setValideInput: React.Dispatch<React.SetStateAction<ValideAuthInput>>;
};

const AuthInputContainer: FC<Props> = ({
  icon,
  inputType,
  inputName,
  max,
  min,
  autoComplete,
  refInput,
  placeholder,
  displayEye,
  displayGen,
  valideInput,
  setValideInput,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleClick = () => {
    setValideInput({ ...valideInput, [inputName]: false });
  };

  const handleBlur = () => {
    const value = refInput!.current!.value;
    if (!value) {
      setValideInput({ ...valideInput, [inputName]: false });
      return;
    };
    if (!inputValidation(inputName, value.trim())) {
      setValideInput({ ...valideInput, [inputName]: false });
      setIsInvalid(true);
      setIsValid(false);
    } else {
      setValideInput({ ...valideInput, [inputName]: true });
      setIsInvalid(false);
      setIsValid(true);
    }
  };

  return (
    <>
      <div className='auth_input_container'>
        <div className='auth_input_icon'>
          {icon === 'name' && <MdOutlineDriveFileRenameOutline size={30} />}
          {icon === 'password' && <RiLockPasswordLine size={30} />}
          {icon === 'email' && <MdOutlineAlternateEmail size={30} />}
          {icon === 'birthdate' && <BsCalendar2Date size={30} />}
        </div>
        <input
          onClick={handleClick}
          onBlur={handleBlur}
          className='auth_input_value'
          type={inputType}
          name={inputName}
          id={inputName}
          maxLength={max === -1 ? undefined : max}
          minLength={min === -1 ? undefined : min}
          required
          autoComplete={autoComplete}
          ref={refInput}
          placeholder={placeholder}
        />
        <AuthInputIsValid
          isValid={isValid}
          isInvalid={isInvalid}
          type={inputName}
        />
        <GeneratePassword refPassword={refInput} display={displayGen} />
        <InputEye refInput={refInput} display={displayEye} />
      </div>
    </>
  );
};

export default AuthInputContainer;
