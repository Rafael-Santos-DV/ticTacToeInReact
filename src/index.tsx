import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StylesGlobal } from './style/stylesGlobal';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StylesGlobal />
    <App />
  </React.StrictMode>
);
