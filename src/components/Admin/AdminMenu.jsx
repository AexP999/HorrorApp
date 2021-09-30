import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import Admin from './Admin';
import FilmEditList from '../Films/FilmEditList'
import Films from '../Films/Films';
import FilmEdit from '../Films/FilmEdit';

function AdminMenu() {
    let { url } = useRouteMatch();
    return (
        <div>
        <nav>
            <ul className="nav-links">
                <li>
                    <Link to={`${url}/create-film`}>insert new film</Link>
                </li>
                <li>
                    <Link to={`${url}/edit-films`}>edit/delete films</Link>
                </li>
            </ul>
        </nav>
  
        <Switch>
          <Route exact path={`${url}/create-film`}>
            <Admin />
          </Route>
          <Route exact path={`${url}/edit-films`}>
              <Films show='list'/>
          </Route>
          <Route exact path={`${url}/edit-films/:filmID`}>
              <FilmEdit/>
          </Route>
        </Switch>
      </div>
    );
}

export default AdminMenu;