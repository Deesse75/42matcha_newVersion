import { FC } from 'react';
import { IoMenu } from 'react-icons/io5';
import MenuElements from './MenuElements';
import { LuLogOut } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';

type Props = {
  matchaMenuOpen: boolean;
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: FC<Props> = ({ matchaMenuOpen, setMatchaMenuOpen }) => {
  const nav = useNavigate();
  return (
    <>
      <div className='header_menu_container'>
        <div
          className='header_menu_icon'
          onClick={() => {
            setMatchaMenuOpen(!matchaMenuOpen);
          }}
        >
          <IoMenu size={30} />
        </div>
        <div
          onClick={() => {
            setMatchaMenuOpen(!matchaMenuOpen);
            nav(appRedir.signout);
          }}
          className='header_menu_icon'
        >
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
