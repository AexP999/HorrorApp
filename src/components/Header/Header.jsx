import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

export default function Header ({ userName }) {

  return (
    <div className='header'>
      <div className="logo-container">
        <img src="images\desktop\logo bloody eyes.png" alt="logo" />
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className='burger'>
              <i className="fa fa-bars"></i>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <i className="fa fa-search"></i>
            </Link>
          </li>
          <li>
            <Link to="/films">Фильмы
              {/* <i className="fa fa-bell"></i> */ }
            </Link>
          </li>
          <li style={ { display: 'flex' } }>
            <Login />
            <Registration />
          </li>
          <li>
            <Link to="/admin">Админ</Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>


    </div >
  );
}
