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
import { useUserDataHook } from './components/Hooks/getUserData.hook';

const App = () => {

  const [ films, setFilms ] = useState([]);
  const [ userInfo, setUserInfo ] = useState({
    userId: '',
    email: '',
    role: '',
    loggedIn: localStorage.getItem('token')
      ? true
      : false,
    accessToken: localStorage.getItem('token')
  });

  const { api } = useHttpHook();
  const { getUserDataFromDb } = useUserDataHook();

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
    if(localStorage.getItem('token')) {
      getUserDataFromDb()
        .then(res => {
          const { userId, email, role } = res;
          setUserInfo({ userId, email, role, loggedIn: true });
        });
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='App'>
      <Router>
        < Header userInfo={ userInfo } />
        <Switch>
          <Route path="/" exact>
            <Home films={ films } />
          </Route>

          <Route path="/login" exact>
            { !userInfo.loggedIn
              && <LogIn userInfo={ userInfo } setUserInfo={ setUserInfo } /> }
          </Route>

          <Route path="/logout">
            { userInfo.loggedIn
              && <LogOut userInfo={ userInfo } setUserInfo={ setUserInfo } /> }
          </Route>

          <Route path="/registration" >
            <Registration />
          </Route>

          <Route path="/admin" >
            { userInfo.loggedIn
              && (userInfo.role === 'admin'
                || userInfo.role === 'moderator')
              && <AdminMenu userInfo={ userInfo } /> }
          </Route >

          <Route path="/search">
            <Search films={ films } />
          </Route>

          <Route path="/films">
            <Films show='poster' />
          </Route>

          <Route path="/filmscard/:id">
            <FilmsCard userId={userInfo.userId}/>
          </Route>

          <Route>
            <h2>404 Page not found</h2>
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
