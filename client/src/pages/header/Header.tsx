import { FC } from 'react';
import Menu from './components/Menu';
import Signout from './components/Signout';

type Props = {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayIconMenu: boolean;
  setDisplayIconMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FC<Props> = ({
  menuIsOpen,
  setMenuIsOpen,
  displayIconMenu,
  setDisplayIconMenu,
}) => {
  return (
    <>
      <div
        className='header_navbar'
        onClick={() => {
          setMenuIsOpen(false);
        }}
      >
        <div className='header_navbar_line'></div>
        <div className='header_navbar_matcha_logo'>
          <div className='header_navbar_logo'>Matcha</div>
        </div>
      </div>
      <Menu
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        displayIconMenu={displayIconMenu}
      />
      <Signout
        setMenuIsOpen={setMenuIsOpen}
        setDisplayIconMenu={setDisplayIconMenu}
      />
    </>
  );
};

export default Header;
