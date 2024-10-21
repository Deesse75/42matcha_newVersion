import { FC } from 'react';
import { useMenuOnOff } from '../../appContext/menuOnOff.context';

type Props = {
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuElements: FC<Props> = ({ setMatchaMenuOpen }) => {
  const mark = useMenuOnOff();
  return (
    <>
      <div className='header_menu_elements_container'>
        <div className='header_menu_elements'>
          <div
            onClick={() => {
              mark.setAllMenuOff();
              setMatchaMenuOpen(false);
            }}
            className={
              mark.dashboardMenu
                ? 'header_menu_elements_on'
                : 'header_menu_elements_off'
            }
          >
            Accueil
          </div>
          <div
            onClick={() => {
              mark.setAllMenuOff();
              setMatchaMenuOpen(false);
            }}
            className={
              mark.profileMenu ? 'menu_on' : 'header_menu_elements_off'
            }
          >
            Modifier le profil
          </div>
          <div
            onClick={() => {
              mark.setAllMenuOff();
              setMatchaMenuOpen(false);
            }}
            className={
              mark.chatMenu
                ? 'header_menu_elements_on'
                : 'header_menu_elements_off'
            }
          >
            Accéder au chat
          </div>
          <div
            onClick={() => {
              mark.setAllMenuOff();
              setMatchaMenuOpen(false);
            }}
            className={
              mark.searchMenu
                ? 'header_menu_elements_on'
                : 'header_menu_elements_off'
            }
          >
            Rechercher
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuElements;
