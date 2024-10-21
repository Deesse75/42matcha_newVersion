import { useState } from 'react';
import AppRoutes from './AppRoutes';
import Footer from './footer/Footer';
import Header from './header/Header';
import MatchaNotif from './notification/matchaNotification/MatchaNotif';

function App() {
  const [matchaMenuIcon, setMatchaMenuIcon] = useState<boolean>(false);
  const [matchaMenuOpen, setMatchaMenuOpen] = useState<boolean>(false);
  const [matchaNotif, setMatchaNotif] = useState<string | null>(null);

  return (
    <>
      <div className='header'>
        <Header
          matchaMenuOpen={matchaMenuOpen}
          setMatchaMenuOpen={setMatchaMenuOpen}
          matchaMenuIcon={matchaMenuIcon}
        />
      </div>

      <div className='system_notification'>
        <MatchaNotif
          matchaNotif={matchaNotif}
          setMatchaNotif={setMatchaNotif}
          setMatchaMenuOpen={setMatchaMenuOpen}
        />
      </div>

      <div className='routes'>
        <AppRoutes
          setMatchaMenuIcon={setMatchaMenuIcon}
          setMatchaMenuOpen={setMatchaMenuOpen}
          setMatchaNotif={setMatchaNotif}
        />
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
