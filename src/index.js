import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store'
import {Provider} from 'react-redux';
import {BrouserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrouserRouter>
          <App />
      </BrouserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
