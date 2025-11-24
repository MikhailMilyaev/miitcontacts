import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App';
import { createContext } from 'react';
import UserStore from './store/UserStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{user: new UserStore(),}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);