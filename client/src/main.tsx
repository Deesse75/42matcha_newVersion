import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './styles/index.scss';
import MemoryProvider from './utils/context/memory.context.tsx';

createRoot(document.getElementById('root')!).render(
  <MemoryProvider>
    <App />
  </MemoryProvider>,
);
