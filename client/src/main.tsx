import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import MemoryProvider from './appContext/memory.context.tsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './appContext/profile.context.tsx';

createRoot(document.getElementById('root')!).render(
  <MemoryProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </MemoryProvider>,
);
