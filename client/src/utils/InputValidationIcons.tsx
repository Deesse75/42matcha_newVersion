import { FC, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { MdErrorOutline } from 'react-icons/md';
import InputRules from './InputRules';

type Props = {
  state: string | null;
  type: string;
};

const InputValidationIcons: FC<Props> = ({ state, type }) => {
  const [rulesOn, setRulesOn] = useState(false);

  return (
    <>
      {state === 'valid' && (
        <>
          <div className='input_validation_icon'>
            <GiCheckMark size={20} style={{ color: 'green' }} />
          </div>
        </>
      )}
      {state === 'invalid' && (
        <>
          <div
            className='input_validation_icon'
            onMouseOver={() => {
              setRulesOn(true);
            }}
            onMouseLeave={() => {
              setRulesOn(false);
            }}
          >
            <MdErrorOutline size={20} style={{ color: 'red' }} />
          </div>
        </>
      )}
      {rulesOn && <InputRules type={type} />}
    </>
  );
};

export default InputValidationIcons;
