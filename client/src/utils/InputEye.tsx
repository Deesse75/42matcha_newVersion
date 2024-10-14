import { FC, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {
  refInput: React.RefObject<HTMLInputElement>;
};

const InputEye: FC<Props> = ({ refInput }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleClick = () => {
    setVisiblePassword(!visiblePassword);
    if (refInput.current) {
      refInput.current.type = visiblePassword ? 'password' : 'text';
    }
  };

  return (
    <div onClick={handleClick}>
      {visiblePassword ? (
        <>
          <AiOutlineEye size={26} color='#111111' />
        </>
      ) : (
        <>
          <AiOutlineEyeInvisible size={26} color='#777777' />
        </>
      )}
    </div>
  );
};

export default InputEye;
