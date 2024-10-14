import { FC, useEffect, useState } from 'react';
import { useMemory } from '../../appContext/memory.context';
import { appRedir } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import ResendLinkEmail from '../resend/ResendLinkEmail';
import ForgotPassword from '../forgot/ForgotPassword';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthPageComponents: FC<Props> = ({ setSystemNotif }) => {
  const memo = useMemory();
  const nav = useNavigate();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  useEffect(() => {
    if (!memo.subPageName) {
      nav(appRedir.errorNotfound);
      return;
    }
    setSelectedPage(memo.subPageName);
  }, [memo.subPageName]);

  useEffect(() => {
    console.log('selected', selectedPage);
  }, [selectedPage]);

  return (
    <>
      <div className='auth_page_selected_page'>
        {selectedPage ? (
          <>
            {selectedPage === 'signin' && (
              <Signin setSystemNotif={setSystemNotif} />
            )}
            {selectedPage === 'signup' && (
              <Signup setSystemNotif={setSystemNotif} />
            )}
            {selectedPage === 'resendLinkEmail' && (
              <ResendLinkEmail setSystemNotif={setSystemNotif} />
            )}
            {selectedPage === 'forgotPassword' && (
              <ForgotPassword setSystemNotif={setSystemNotif} />
            )}
          </>
        ) : (
          <>
            <div className='wait_to_charge'>Chargement en cours ...</div>
          </>
        )}
      </div>
    </>
  );
};

export default AuthPageComponents;
