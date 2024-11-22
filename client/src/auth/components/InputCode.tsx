import { FC } from 'react';

type Props = {
  id: number;
  currentRef: React.RefObject<HTMLInputElement>;
  nextRef: React.RefObject<HTMLInputElement>;
};

const InputCode: FC<Props> = ({ id, currentRef, nextRef }) => {
  return (
    <>
        <input
          className='reinit__number_input'
          key={id}
          type='text'
          name={`Num${id}`}
          id={`Num${id}`}
          placeholder='_'
          maxLength={1}
          minLength={1}
          autoFocus={id === 1}
          ref={currentRef}
          autoComplete='off'
          onChange={() => {
            nextRef.current?.focus();
          }}
        />
    </>
  );
};
export default InputCode;
