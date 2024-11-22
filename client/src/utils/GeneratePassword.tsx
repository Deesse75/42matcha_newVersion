import { FC, useEffect, useState } from 'react';
import { MdPassword } from 'react-icons/md';
import generateFunction from './generateFunction';

type Props = {
  refPassword: React.RefObject<HTMLInputElement> | null;
};

const GeneratePassword: FC<Props> = ({ refPassword }) => {
  const [labelText, setLabelText] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [generate, setGenerate] = useState<boolean>(false);

  useEffect(() => {
    if (!generate) return;
    setNewPassword(generateFunction());
    setGenerate(false);
  }, [generate]);

  useEffect(() => {
    if (!newPassword) return;
    if (refPassword && refPassword.current) {
      refPassword.current.value = newPassword;
    }
    setNewPassword(null);
  }, [newPassword]);

  return (
    <>
      <div
        className='generate_icon'
        onMouseOver={() => {
          setLabelText(true);
        }}
        onMouseLeave={() => {
          setLabelText(false);
        }}
        onClick={() => {
          setGenerate(true);
        }}
      >
        <MdPassword size={20} color='#444444' />
      </div>
      {labelText && (
        <div className='generate_icon_text'>Générer un mot de passe</div>
      )}
    </>
  );
};

export default GeneratePassword;
