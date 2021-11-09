import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function Header ({ userInfo }) {

  console.log('USERINFO HEADER', userInfo);

  return (
    <header className='header'>
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
            </Link>
          </li>

          { (userInfo.loggedIn === true)
            ? <li>
              <i style={ { marginRight: '4px' } } className="far fa-user"></i>
              <Link to="/logout">{ userInfo.email || localStorage.getItem('email') } Выйти </Link>
            </li>
            :
            <>
              <li>

                <Link to="/login"> <i style={ { marginRight: '4px' } } className="far fa-user"></i> Войти</Link>
              </li>
              <li>
                <Link to="/registration">Регистрация</Link>
              </li>
            </> }

          { (userInfo.role === 'admin') && (userInfo.loggedIn === true)
            ? <>
              <li>
                <Link to="/admin">Админ</Link>
              </li>
            </>
            : null
          }
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>


    </header >
  );
};
