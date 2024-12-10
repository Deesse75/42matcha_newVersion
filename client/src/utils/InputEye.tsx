import { FC, useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {
  refPassword: React.RefObject<HTMLInputElement> | null;
};

const InputEye: FC<Props> = ({ refPassword }) => {
  const [action, setAction] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  useEffect(() => {
    if (!action) return;
    if (refPassword && refPassword.current)
      refPassword.current.type = visiblePassword ? 'text' : 'password';
    setAction(false);
  }, [action]);

  return (
    <div
      className='input_eye_icon'
      onClick={() => {
        setAction(true);
        setVisiblePassword(!visiblePassword);
      }}
    >
      {visiblePassword ? (
        <>
          <AiOutlineEye size={24} color='#111111' />
        </>
      ) : (
        <>
          <AiOutlineEyeInvisible size={24} color='#777777' />
        </>
      )}
    </div>
  );
};

export default InputEye;
