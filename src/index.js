import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import 'firebase/database'; // Importa el módulo de la base de datos si lo necesitas

const root = createRoot(document.getElementById('root')); // Utiliza createRoot importado de 'react-dom/client'

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, puedes utilizar reportWebVitals
reportWebVitals();
