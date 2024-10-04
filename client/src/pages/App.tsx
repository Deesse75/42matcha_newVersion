import { useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import AppRoutes from './routes/AppRoutes';
import SystemNotif from './systemNotification/SystemNotif';

function App() {
  const [displayIconMenu, setDisplayIconMenu] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [systemNotif, setSystemNotif] = useState<string | null>(null);

  return (
    <>
      <div className='header'>
        <Header
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        displayIconMenu={displayIconMenu}
        setDisplayIconMenu={setDisplayIconMenu}
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
        displayIconMenu={displayIconMenu}
        setDisplayIconMenu={setDisplayIconMenu}
        setMenuIsOpen={setMenuIsOpen}
        setSystemNotif={setSystemNotif}
        />
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
