import { FC, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { MdErrorOutline } from 'react-icons/md';
import AuthInputRules from './AuthInputRules';

type Props = {
  isValid: boolean;
  isInvalid: boolean;
  type: string;
};

const AuthInputIsValid: FC<Props> = ({ isValid, isInvalid, type }) => {
  const [rulesOn, setRulesOn] = useState(false);

  return (
    <>
      <div className='auth_input_icon_container'>
        {isValid && (
          <div className='auth_input_display_icon'>
            <GiCheckMark size={15} style={{ color: 'green' }} />
          </div>
        )}
        {isInvalid && (
          <>
            <div
              onMouseOver={() => {
                setRulesOn(true);
              }}
              onMouseLeave={() => {
                setRulesOn(false);
              }}
              className='auth_input_display_icon'
            >
              <MdErrorOutline size={15} style={{ color: 'red' }} />
            </div>
            {rulesOn && (
              <div className='auth_input_display_icon_rules'>
                <AuthInputRules type={type} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AuthInputIsValid;
