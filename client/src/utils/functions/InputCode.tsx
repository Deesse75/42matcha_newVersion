import { FC } from 'react';

type Props = {
  id: number;
  currentRef: React.RefObject<HTMLInputElement>;
  nextRef: React.RefObject<HTMLInputElement>;
};

const InputCode: FC<Props> = ({ id, currentRef, nextRef }) => {
  return (
    <>
      <div className='reinit_page_form_number_input'>
        <input
          className='reinit_page_form_number_input_insert'
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
      </div>
    </>
  );
};
export default InputCode;
