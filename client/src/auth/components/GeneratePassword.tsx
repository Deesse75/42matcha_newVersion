import { FC, useState } from 'react';
import generate from '../../utils/generate';
import { CgPassword } from 'react-icons/cg';

type Props = {
  display: boolean;
  refPassword: React.RefObject<HTMLInputElement> | null;
};

const GeneratePassword: FC<Props> = ({ display, refPassword }) => {
  const [labelText, setLabelText] = useState<boolean>(false);

  return (
    <>
      <div className='auth_input_icon_container'>
        {display && (
          <>
            <div
              className='auth_input_display_icon'
              onMouseOver={() => {
                setLabelText(true);
              }}
              onMouseLeave={() => {
                setLabelText(false);
              }}
              onClick={() => {
                generate(refPassword);
              }}
            >
              <CgPassword size={24} />
            </div>
            {labelText && (
              <div className='auth_input_display_icon_pass'>
                Générer un mot de passe
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GeneratePassword;
