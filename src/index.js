import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './modules/store'
import { Provider } from 'react-redux';
import Chat from './components/chat';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <Routes>
      <Route path="/" Component={App}></Route>
      <Route path="/chat" Component={Chat}></Route>
    </Routes>
  </Provider>
  </BrowserRouter>
);


