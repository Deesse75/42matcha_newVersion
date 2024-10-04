import { FC, useEffect } from 'react';
import Cookies from 'js-cookie';

type Props = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Signout: FC<Props> = ({ setMenuIsOpen, setDisplayIconMenu }) => {

  useEffect(() => {
    setMenuIsOpen(false);
    setDisplayIconMenu(false);
    Cookies.remove('session');
  }, []);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default Signout;
