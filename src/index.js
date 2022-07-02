import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// react router setup
import { BrowserRouter } from 'react-router-dom';

// providing redux store to app
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
