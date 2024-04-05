import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import 'firebase/database'; // Importa el módulo de la base de datos si lo necesitas



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


// Si deseas medir el rendimiento de tu aplicación, puedes utilizar reportWebVitals
reportWebVitals();
