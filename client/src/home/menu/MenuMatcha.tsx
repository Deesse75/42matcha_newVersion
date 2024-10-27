import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';

type Props = {};

const MenuMatcha: FC<Props> = ({}) => {
  const nav = useNavigate();
  const me = useUserInfo();

  return (
    <>
      <div className='menu_container'>
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
          DOnnées personnelles
        </div>
        <div
          onClick={() => {
            nav(appRedir.profile);
          }}
          className='menu_title'
        >
          Profil
        </div>
        <div
          onClick={() => {
            nav(appRedir.search);
          }}
          className='menu_title'
        >
          Rechercher
        </div>
        <div
          onClick={() => {
            nav(appRedir.chat);
          }}
          className='menu_title'
        >
          Chat
        </div>
        <div className='menu_title'>
          <div className='menu_subtitle1'>Historique utilisateur</div>
          <div
            onClick={() => {
              me.setHistorySelected('matcha');
              nav(appRedir.listing);
            }}
            className='menu_subtitle2'
          >
            Selection Matcha
          </div>
          <div
            onClick={() => {
              me.setHistorySelected('match');
              nav(appRedir.listing);
            }}
            className='menu_subtitle2'
          >
            Matchs
          </div>
          <div
            onClick={() => {
              me.setHistorySelected('view');
              nav(appRedir.listing);
            }}
            className='menu_subtitle2'
          >
            Visites reçues
          </div>
          <div
            onClick={() => {
              me.setHistorySelected('like');
              nav(appRedir.listing);
            }}
            className='menu_subtitle2'
          >
            Likes reçus
          </div>
          <div
            onClick={() => {
              me.setHistorySelected('visited');
              nav(appRedir.listing);
            }}
            className='menu_subtitle2'
          >
            Profils visités
          </div>
          <div
            onClick={() => {
              me.setHistorySelected('liked');
              nav(appRedir.listing);
            }}
            className='menu_subtitle2'
          >
            Profils likés
          </div>
          <div
            onClick={() => {
              me.setHistorySelected('banned');
              nav(appRedir.listing);
            }}
            className='menu_subtitle2'
          >
            Profils Bloqués
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuMatcha;
