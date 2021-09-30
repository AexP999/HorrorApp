import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login';
import AdminMenu from './components/Admin/AdminMenu';
import Header from '../src/components/Header/Header';
import FilmsCard from './components/FilmsCard/FilmsCard';
import Films from './components/Films/Films';
import { PATHTO } from './constants/constants';
import { FilmContext } from './components/Context';
import UseFetch from './components/UseFetch';

const url = `${ PATHTO.HOST_NAME }/films`;

const FilmContextProvider = ({ children }) => {
  const { isLoading, films } = UseFetch(url);

  return <FilmContext.Provider value={
    { films, isLoading }
  }>
    { children }
  </FilmContext.Provider>;

};

const App = () => {
  const isLoading = useContext(FilmContext);
  return (
    <FilmContextProvider>
      <main className='App'>
        { isLoading ? <h4>Loading...</h4>
          :
          <Router>
            < Header />
            <Switch>
              <Route path="/" component={ Home } exact />
              <Route path="/login" component={ Login } />
              <Route path="/admin" component={ AdminMenu } />
              <Route path="/films"> <Films show='poster' /> 
              </Route>
              <Route path="/filmscard/:id">
                <FilmsCard />
              </Route>
              <Route><h2>
                404 Page not found</h2>
              </Route>
            </Switch>
          </Router>
        }
      </main>
    </FilmContextProvider>
  );
};

export default App;
