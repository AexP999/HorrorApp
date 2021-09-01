import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import './App.css';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login';

const App = () => {
  return (
    <Router>
      <div className='App'>


        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/login" component={ Login } />

          <Route>
            <h2>404 Page not found</h2>
          </Route>

        </Switch>
      </div>
    </Router>
  );
};

export default App;
