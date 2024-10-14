import { FC } from 'react';
import { IoMenu } from 'react-icons/io5';
import MenuElements from './MenuElements';
import { LuLogOut } from 'react-icons/lu';

type Props = {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: FC<Props> = ({ menuIsOpen, setMenuIsOpen }) => {
  return (
    <>
      <div className='header_menu_container'>
        <div
          className='header_menu_icon'
          onClick={() => {
            setMenuIsOpen(!menuIsOpen);
          }}
        >
          <IoMenu size={3} />
          <LuLogOut size={30} />
        </div>
        {menuIsOpen && (
          <>
            <MenuElements />
          </>
        )}
      </div>
    </>
  );
};

export default Menu;
