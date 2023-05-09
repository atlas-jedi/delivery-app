import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import DeliveryProvider from './context/DeliveryProvider';

ReactDOM.render(
<<<<<<< HEAD
  <BrowserRouter>
    <DeliveryProvider>
      <App />
    </DeliveryProvider>
  </BrowserRouter>,
=======
  <React.StrictMode>
    <BrowserRouter>
      <DeliveryProvider>
        <App />
      </DeliveryProvider>
    </BrowserRouter>
  </React.StrictMode>,
>>>>>>> origin/main-group-5-customers-orders
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
