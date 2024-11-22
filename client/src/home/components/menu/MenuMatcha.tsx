import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../../appConfig/appPath';
import { useMemory } from '../../../appContext/memory.context';

type Props = {};

const MenuMatcha: FC<Props> = ({}) => {
  const nav = useNavigate();
  const memo = useMemory();

  return (
    <>
      <div className='menu_container'>
        <div className='menu_navigation'>
          <div className='menu_navigation_section'>
            <div
              className='menu_title'
              onClick={() => {
                nav(appRedir.dashboard);
              }}
            >
              Tableau de bord
            </div>
            <div className='menu_drop'>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('matcha');
                  nav(appRedir.history);
                }}
              >
                Selection Matcha
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('match');
                  nav(appRedir.history);
                }}
              >
                Matchs
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('like');
                  nav(appRedir.history);
                }}
              >
                Likes reçus
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('view');
                  nav(appRedir.history);
                }}
              >
                Visites reçues
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('liked');
                  nav(appRedir.history);
                }}
              >
                Profils likés
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('visited');
                  nav(appRedir.history);
                }}
              >
                Profils visités
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('mute');
                  nav(appRedir.history);
                }}
              >
                Profils Mute
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('banned');
                  nav(appRedir.history);
                }}
              >
                Profils bloqués
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('stats');
                  nav(appRedir.history);
                }}
              >
                Stats
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  memo.setListingName('notif');
                  nav(appRedir.history);
                }}
              >
                Notifications non lues
              </div>
            </div>
          </div>

          <div className='menu_navigation_section'>
            <div
              className='menu_title'
              onClick={() => {
                nav(appRedir.account);
              }}
            >
              Profil
            </div>
            <div className='menu_drop'>
              <div
                className='menu_drop_row'
                onClick={() => {
                  nav(appRedir.deletePhotoProfil);
                }}
              >
                Supprimer la photo de profil
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  nav(appRedir.updatePhotosPlus);
                }}
              >
                Modifier les photos secondaires
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  nav(appRedir.updatePassword);
                }}
              >
                Modifier mot de passe
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  nav(appRedir.updateEmail);
                }}
              >
                Modifier adresse email
              </div>
              <div
                className='menu_drop_row'
                onClick={() => {
                  nav(appRedir.deleteAccount);
                }}
              >
                Supprimer le compte
              </div>
            </div>
          </div>

          <div className='menu_navigation_section'>
            <div
              className='menu_title'
              onClick={() => {
                nav(appRedir.search);
              }}
            >
              Rechercher
            </div>
          </div>

          <div className='menu_navigation_section'>
            <div
              className='menu_title'
              onClick={() => {
                nav(appRedir.chat);
              }}
            >
              Chat
            </div>
          </div>

          <div className='menu_navigation_section'>
            <div
              className='menu_title'
              onClick={() => {
                nav(appRedir.contact);
              }}
            >
              Nous contacter
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuMatcha;
