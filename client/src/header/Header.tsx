import { FC } from 'react';
import Menu from './components/Menu';

type Props = {
  matchaMenuOpen: boolean;
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  matchaMenuIcon: boolean;
};

const Header: FC<Props> = ({
  matchaMenuOpen,
  setMatchaMenuOpen,
  matchaMenuIcon,
}) => {
  return (
    <>
      <div
        className='header_navbar'
        onClick={() => {
          setMatchaMenuOpen(false);
        }}
      >
        <div className='header_navbar_line'></div>
        <div className='header_navbar_matcha_logo'>
          <div className='header_navbar_logo'>Matcha</div>
        </div>
      </div>
      {matchaMenuIcon && (
        <Menu
          matchaMenuOpen={matchaMenuOpen}
          setMatchaMenuOpen={setMatchaMenuOpen}
        />
      )}
    </>
  );
};

export default Header;
