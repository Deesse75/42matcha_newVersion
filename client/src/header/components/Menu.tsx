import { FC } from 'react';
import { IoMenu } from 'react-icons/io5';
import MenuElements from './MenuElements';
import { LuLogOut } from 'react-icons/lu';

type Props = {
  matchaMenuOpen: boolean;
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: FC<Props> = ({ matchaMenuOpen, setMatchaMenuOpen }) => {
  return (
    <>
      <div className='header_menu_container'>
        <div
          className='header_menu_icon'
          onClick={() => {
            setMatchaMenuOpen(!matchaMenuOpen);
          }}
        >
          <IoMenu size={3} />
          <LuLogOut size={30} />
        </div>
        {matchaMenuOpen && (
          <>
            <MenuElements setMatchaMenuOpen={setMatchaMenuOpen} />
          </>
        )}
      </div>
    </>
  );
};

export default Menu;
