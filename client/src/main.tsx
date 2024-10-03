import { createRoot } from 'react-dom/client';
import App from './pages/app/App.tsx';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
