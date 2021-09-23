import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import Admin from './Admin';
import FilmEditDelete from '../FilmEditDelete/FilmEditDelete'

function AdminMenu() {
    let { path, url } = useRouteMatch();
    return (
        // <h2>Admin panel</h2>
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
                <FilmEditDelete/>
            </Route>
        </Switch>
      </div>
    );
}

export default AdminMenu;