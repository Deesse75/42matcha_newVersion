import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './styles/index.scss';
import MemoryProvider from './utils/context/memory.context.tsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './utils/context/user.context.tsx';

createRoot(document.getElementById('root')!).render(
  <MemoryProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </MemoryProvider>,
);
