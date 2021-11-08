import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { FilmContextProvider } from './components/Contexts/FilmContext';

ReactDOM.render(
  <React.StrictMode>
{/* <FilmContextProvider> */}
    <App />
{/* </FilmContextProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
