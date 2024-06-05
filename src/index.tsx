// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);  // Usar createRoot para React 18

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
