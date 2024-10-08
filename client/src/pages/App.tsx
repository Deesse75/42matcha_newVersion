import { useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import AppRoutes from './routes/AppRoutes';
import SystemNotif from './systemNotification/SystemNotif';

function App() {
  const [displayIconMenu, setDisplayIconMenu] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [systemNotif, setSystemNotif] = useState<string | null>(null);
  const [historyMenuOn, setHistoryMenuOn] = useState<boolean>(false);

  return (
    <>
      <div className='header'>
        <Header
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        displayIconMenu={displayIconMenu}
        />
      </div>

      <div className='system_notification'>
        <SystemNotif
          systemNotif={systemNotif}
          setSystemNotif={setSystemNotif}
          setMenuIsOpen={setMenuIsOpen}
        />
      </div>

      <div className='routes'>
        <AppRoutes
        setDisplayIconMenu={setDisplayIconMenu}
        setMenuIsOpen={setMenuIsOpen}
        setSystemNotif={setSystemNotif}
        historyMenuOn={historyMenuOn}
        setHistoryMenuOn={setHistoryMenuOn}
        />
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
