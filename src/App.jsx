import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home.jsx';
import LogIn from './components/LogIn/LogIn';
import LogOut from './components/LogOut/LogOut';
import Registration from './components/Registration/Registration';
import AdminMenu from './components/Admin/AdminMenu';
import Header from '../src/components/Header/Header';
import FilmsCard from './components/FilmsCard/FilmsCard';
import Films from './components/Films/Films';
import Search from './components/Search/Search';
import { useHttpHook } from './components/Hooks/api.hook';

const App = () => {

  const [ films, setFilms ] = useState([]);
  const [ userInfo, setUserInfo ] = useState({ userId: '', email: localStorage.getItem('email') || '', role: localStorage.getItem('role') || '', loggedIn: localStorage.getItem('token') ? true : false, accessToken: '' });

  const { api } = useHttpHook();

  const fetchData = async () => {
    try {
      const result = await api.get('/films');
      setFilms(result.data);
    } catch(err) {
      console.log('Ошибка загрузки заданий', err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('APP RENDER', films);
  console.log('loggedIn APP', userInfo.loggedIn);
  return (
    <main className='App'>
      <Router>
        < Header userInfo={ userInfo } />
        <Switch>
          <Route path="/" exact>
            <Home films={ films } />
          </Route>
          <Route path="/login" exact>
            { !userInfo.loggedIn && <LogIn userInfo={ userInfo } setUserInfo={ setUserInfo } /> }
          </Route>
          <Route path="/logout">
            { userInfo.loggedIn && <LogOut userInfo={ userInfo } setUserInfo={ setUserInfo } /> }
          </Route>
          <Route path="/registration" >
            <Registration />
          </Route>
          <Route path="/admin" >
            { userInfo.loggedIn && (userInfo.role === 'admin') && <AdminMenu /> }
          </Route >
          <Route path="/search">
            <Search films={ films } />
          </Route>
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
    </main>
  );
};

export default App;
