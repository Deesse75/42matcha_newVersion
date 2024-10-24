import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './appContext/user.context.tsx';
import MenuOnOffProvider from './appContext/menuOnOff.context.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <MenuOnOffProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MenuOnOffProvider>
  </UserProvider>,
);
