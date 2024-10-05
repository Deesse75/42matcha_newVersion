import { FC } from 'react';
import { useMemory } from '../../../utils/context/memory.context';

type Props = {};

const MenuElements: FC<Props> = ({}) => {
  const memo = useMemory();

  return (
    <>
      <div className='header_menu_elements_container'>
        <div className='header_menu_elements'>
          <div
            className={
              memo.dashboard
                ? 'header_menu_elements_on'
                : 'header_menu_elements_off'
            }
          >
            Tableau de bord
          </div>
          <div
            className={
              memo.profile ? 'menu_on' : 'header_menu_elements_off'
            }
          >
            Profil
          </div>
          <div
            className={
              memo.chat
                ? 'header_menu_elements_on'
                : 'header_menu_elements_off'
            }
          >
            Chat
          </div>
          <div
            className={
              memo.search
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
