import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './styles/index.scss';
import MemoryProvider from './utils/context/memory.context.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <MemoryProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MemoryProvider>,
);
