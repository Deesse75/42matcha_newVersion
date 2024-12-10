import { FC } from 'react';
import { appRedir } from '../../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../../appContext/user.context';

type Props = {};

const MiniHistory: FC<Props> = ({}) => {
  const nav = useNavigate();
  const me = useUserInfo();

  return (
    <>
      <div className='history_menu'>
        <div className='history_menu_title'>Historique utilisateur</div>
        <div className='history_menu_tab'>
          <button
            onClick={() => {
              me.setHistorySelected('matcha');
              nav(appRedir.listing);
            }}
            className='history_menu_tab_button'
          >
            Selection Matcha
          </button>
          <button
            onClick={() => {
              me.setHistorySelected('match');
              nav(appRedir.listing);
            }}
            className='history_menu_tab_button'
          >
            Mes matchs
          </button>
          <button
            onClick={() => {
              me.setHistorySelected('view');
              nav(appRedir.listing);
            }}
            className='history_menu_tab_button'
          >
            Profils visiteurs
          </button>
          <button
            onClick={() => {
              me.setHistorySelected('like');
              nav(appRedir.listing);
            }}
            className='history_menu_tab_button'
          >
            Profils admirateurs
          </button>
          <button
            onClick={() => {
              me.setHistorySelected('visited');
              nav(appRedir.listing);
            }}
            className='history_menu_tab_button'
          >
            Profils visités
          </button>
          <button
            onClick={() => {
              me.setHistorySelected('liked');
              nav(appRedir.listing);
            }}
            className='history_menu_tab_button'
          >
            Profils aimés
          </button>
          <button
            onClick={() => {
              me.setHistorySelected('banned');
              nav(appRedir.listing);
            }}
            className='history_menu_tab_button'
          >
            Profils bloqués
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniHistory;
