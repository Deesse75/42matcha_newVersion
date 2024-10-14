import { FC } from 'react';
import Menu from './components/Menu';

type Props = {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayIconMenu: boolean;
};

const Header: FC<Props> = ({ menuIsOpen, setMenuIsOpen, displayIconMenu }) => {
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
      {displayIconMenu && (
        <Menu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      )}
    </>
  );
};

export default Header;
