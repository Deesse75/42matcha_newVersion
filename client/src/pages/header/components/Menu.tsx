import { FC } from 'react';
import { IoMenu } from 'react-icons/io5';
import MenuElements from './MenuElements';

type Props = {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayIconMenu: boolean;
};

const Menu: FC<Props> = ({ menuIsOpen, setMenuIsOpen, displayIconMenu }) => {
  return (
    <>
      <div className='header_menu_container'>
        {displayIconMenu && (
          <>
            <div
              className='header_menu_icon'
              onClick={() => {
                setMenuIsOpen(!menuIsOpen);
              }}
            >
              <IoMenu size={3} />
            </div>
            {menuIsOpen && (
              <>
                <MenuElements />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Menu;
