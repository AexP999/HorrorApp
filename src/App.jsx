import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Header from '../src/components/Header/Header';
import { PATHTO } from './constants/constants';
import { FilmContext } from './components/Context';

const FilmContextProvider = ({ children }) => {
  const [ films, setFilms ] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${ PATHTO.HOST_NAME }/films`);
      const result = await response.json();
      setFilms(result);
    } catch(error) {
      console.log('Ошибка загрузки заданий', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [ fetchData ]);

  return <FilmContext.Provider value={
    { films }
  }>
    { children }
  </FilmContext.Provider>;

};

const App = () => {

  return (
    <FilmContextProvider>
      <main className='App'>
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/login" component={ Login } />
            <Route path="/admin" component={ Admin } />
            <Route><h2>
              404 Page not found</h2>
            </Route>
          </Switch>
        </Router>
      </main>
    </FilmContextProvider>
  );
};

export default App;
