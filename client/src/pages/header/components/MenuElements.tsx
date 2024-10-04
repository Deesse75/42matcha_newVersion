import { FC } from 'react';
import { usePages } from '../../../utils/context/pages.context';

type Props = {};

const MenuElements: FC<Props> = ({}) => {
  const markMenu = usePages();

  return (
    <>
      <div className='header_menu_elements_container'>
        <div className='header_menu_elements'>
          <div
            className={
              markMenu.dashboardPage
                ? 'header_menu_elements_on'
                : 'header_menu_elements_off'
            }
          >
            Tableau de bord
          </div>
          <div
            className={
              markMenu.profilePage ? 'menu_on' : 'header_menu_elements_off'
            }
          >
            Profil
          </div>
          <div
            className={
              markMenu.chatPage
                ? 'header_menu_elements_on'
                : 'header_menu_elements_off'
            }
          >
            Chat
          </div>
          <div
            className={
              markMenu.searchPage
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
