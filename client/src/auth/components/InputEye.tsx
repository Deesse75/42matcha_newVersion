import { FC, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {
  refInput: React.RefObject<HTMLInputElement> | null;
  display: boolean;
};

const InputEye: FC<Props> = ({ refInput, display }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleClick = () => {
    setVisiblePassword(!visiblePassword);
    if (refInput && refInput.current) {
      refInput.current.type = visiblePassword ? 'password' : 'text';
    }
  };

  return (
    <div className='auth_input_icon_container'>
      {display && (
        <>
          <div onClick={handleClick} className='auth_input_display_icon'>
            {visiblePassword ? (
              <>
                <AiOutlineEye size={28} color='#111111' />
              </>
            ) : (
              <>
                <AiOutlineEyeInvisible size={28} color='#777777' />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InputEye;
