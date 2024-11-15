import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './appContext/user.context.tsx';
import SelectMenuProvider from './appContext/selectMenu.context.tsx';
import MemoryProvider from './appContext/memory.context.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <SelectMenuProvider>
      <MemoryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MemoryProvider>
    </SelectMenuProvider>
  </UserProvider>,
);
