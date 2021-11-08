import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
// import { FilmContext } from '../Contexts/FilmContext';

export default React.memo(function Header ({ userInfo }) {

  // const { userInfo } = useContext(FilmContext);
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
          { userInfo.loggedIn
            ? <li>
              <i style={ { marginRight: '4px' } } className="far fa-user"></i>
              <Link to="/logout">{ userInfo.email } Выйти </Link>
            </li>
            :
            <>
              <li>
                <i style={ { marginRight: '4px' } } className="far fa-user"></i>
                <Link to="/login">Войти</Link>
              </li>
              <li>
                <Link to="/registration">Регистрация</Link>
              </li>
            </> }

          { (userInfo.role === 'admin') && userInfo.loggedIn
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
});
