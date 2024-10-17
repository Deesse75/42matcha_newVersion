import { FC, useEffect } from 'react';
import Cookies from 'js-cookie';

type Props = {
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchaMenuIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

const Signout: FC<Props> = ({ setMatchaMenuOpen, setMatchaMenuIcon }) => {
  useEffect(() => {
    setMatchaMenuOpen(false);
    setMatchaMenuIcon(false);
    Cookies.remove('session');
  }, []);

  return (
    <>
      <div className='wait_to_charge'>Chargement en cours ...</div>
    </>
  );
};

export default Signout;
