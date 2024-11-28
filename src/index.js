import { App } from './app';
import { createRoot } from 'react-dom/client';
import { DataProvider } from '@data';
import './index.css';

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => (
  <DataProvider>
    <App />
  </DataProvider>
)

root.render(<ProvisionedApp />)
