import { FC, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { appRedir } from '../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';

type Props = {};

const MenuMatcha: FC<Props> = ({}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const nav = useNavigate();

  return (
    <>
      <div className='menu_container'>
        {openMenu ? (
          <>
            <div className='menu_list'>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.dashboard);
                }}
              >
                Accueil
              </div>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.account);
                }}
              >
                Profil
              </div>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.updatePhotos);
                }}
              >
                Photos
              </div>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.displayProfil);
                }}
              >
                Voir des profils
              </div>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.search);
                }}
              >
                Rechercher
              </div>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.chat);
                }}
              >
                Chat
              </div>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.history);
                }}
              >
                Historique
              </div>
              <div
                className='menu_list_row'
                onClick={() => {
                  setOpenMenu(false);
                  nav(appRedir.contact);
                }}
              >
                Contact
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className='menu_arrow'
              onClick={() => {
                setOpenMenu(true);
              }}
            >
              <IoIosArrowForward />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MenuMatcha;
