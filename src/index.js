import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import axios from "axios";
import './demo.css';
// import './App.module.css';
import './styles/index.module.css';
import 'font-awesome/css/font-awesome.min.css';


import reportWebVitals from './reportWebVitals';

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
