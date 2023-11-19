import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/service-worker.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
