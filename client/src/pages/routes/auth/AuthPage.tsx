import { FC } from 'react';
import AuthPageComponents from './components/AuthPageComponents';
import BackgroundImg from './components/BackgroundImg';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Auth: FC<Props> = ({ setSystemNotif }) => {
  return (
    <>
      <div className='auth_page_container'>
        <div className='auth_pages_display'>
          <AuthPageComponents setSystemNotif={setSystemNotif} />
        </div>
        <BackgroundImg />
      </div>
    </>
  );
};

export default Auth;
