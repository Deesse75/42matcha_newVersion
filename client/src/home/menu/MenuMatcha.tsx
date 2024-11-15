import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import { useSelectMenu } from '../../appContext/selectMenu.context';

type Props = {};

const MenuMatcha: FC<Props> = ({}) => {
  const nav = useNavigate();
  const menu = useSelectMenu();

  return (
    <>
      <div className='menu_container'>
        <div className='menu_navigation'>
          <div
            onClick={() => {
              nav(appRedir.dashboard);
            }}
            className='menu_title'
          >
            Tableau de bord
          </div>
          <div
            onClick={() => {
              nav(appRedir.account);
            }}
            className='menu_title'
          >
            Mon profil
          </div>
          <div
            onClick={() => {
              nav(appRedir.search);
            }}
            className='menu_title'
          >
            Rechercher des profils
          </div>
          <div
            onClick={() => {
              nav(appRedir.chat);
            }}
            className='menu_title'
          >
            Accéder au Chat
          </div>
          <div className='menu_history'>
            <div
              onClick={() => {
                menu.setHistorySelected('matcha');
                nav(appRedir.history);
              }}
              className='menu_title'
            >
              Selection Matcha
            </div>
            <div
              onClick={() => {
                menu.setHistorySelected('match');
                nav(appRedir.history);
              }}
              className='menu_title'
            >
              Mes matchs
            </div>
            <div
              onClick={() => {
                menu.setHistorySelected('view');
                nav(appRedir.history);
              }}
              className='menu_title'
            >
              Mes visites reçues
            </div>
            <div
              onClick={() => {
                menu.setHistorySelected('like');
                nav(appRedir.history);
              }}
              className='menu_title'
            >
              Mes likes reçus
            </div>
            <div
              onClick={() => {
                menu.setHistorySelected('visited');
                nav(appRedir.history);
              }}
              className='menu_title'
            >
              Les profils visités
            </div>
            <div
              onClick={() => {
                menu.setHistorySelected('liked');
                nav(appRedir.history);
              }}
              className='menu_title'
            >
              Les profils likés
            </div>
            <div
              onClick={() => {
                menu.setHistorySelected('banned');
                nav(appRedir.history);
              }}
              className='menu_title'
            >
              Les profils bloqués
            </div>
          </div>
          <div
            className='menu_contact'
            onClick={() => {
              nav(appRedir.contact);
            }}
          >
            Nous contacter
          </div>
          <div
            className='menu_delete'
            onClick={() => {
              nav(appRedir.deleteAccount);
            }}
          >
            Supprimer mon profil
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuMatcha;
