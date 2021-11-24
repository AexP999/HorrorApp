import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import AllUsers from './AllUsers/AllUsers';
import FilmInput from '../Films/FilmInput';

import Films from '../Films/Films';
import FilmEdit from '../Films/FilmEdit';
import './AdminMenu.css';
import FilmDelete from '../Films/FilmDelete';

function AdminMenu ({ userInfo }) {
  let { url } = useRouteMatch();
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          {

          }
          <li>
            <Link to={ `${ url }/create-film` }><h2>insert new film</h2> </Link>
          </li>
          <li>
            <Link to={ `${ url }/edit-films` }><h2>edit/delete films</h2></Link>
          </li>
          { userInfo.role === 'admin'
            ? <li>
              <Link to={ `${ url }/users` }><h2>display all users</h2></Link>
            </li>
            : null }
        </ul>
      </nav>

      <Switch>

        <Route exact path={ `${ url }/create-film` }>
          <FilmInput />
        </Route>

        <Route exact path={ `${ url }/edit-films` }>
          <Films show='list' />
        </Route>

        <Route exact path={ `${ url }/edit-films/:filmID` }>
          <FilmEdit />
        </Route>

        <Route exact path={ `${ url }/users` }>
          { (userInfo.role === 'admin')
            && <AllUsers /> }
        </Route>

        <Route exact path={ `${ url }/delete-films/:filmID` }>
          <FilmDelete />
        </Route>

      </Switch>
    </div>
  );
}

export default AdminMenu;
