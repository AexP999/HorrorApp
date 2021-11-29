
import './Header.css';
import { Link } from "react-router-dom";
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import logoImg from '../../img/logo_bloody_eye_wozr.png';
import logoPupilImg from '../../img/logo_zrachok.png';

export default function Header ({ userInfo }) {

  let pupil = document.querySelectorAll('.pupil');

  document.addEventListener('mousemove', (e => {
    let x = e.clientX,
      y = e.clientY,
      height = window.innerHeight,
      width = window.innerWidth;

    let deltaX = (x - width / 2) / width,
      deltaY = (y - height / 2) / height;

    [].forEach.call(pupil, el => {

      el.style.transform = `
        translateX(${ deltaX * 40 }px)
        translateY(${ deltaY * 10 }px)
      `;
    });

  }));

  return (
    <header className='header'>
      <div className="logo-container">
        <img src={ logoImg } alt="logo" />
        <img className="pupil" src={ logoPupilImg } alt="logo pupil" />
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
            <Link to="/films">Фильмы</Link>
          </li>

          { (userInfo.loggedIn === true)
            ? <li >
              <Link to="/logout">
                <i style={ { marginRight: '4px' } } className="far fa-user"></i>
                { userInfo.email } Выйти
              </Link>
            </li>
            : <>
              <li>
                <Link to="/login">
                  <i style={ { marginRight: '4px' } } className="far fa-user"></i> Войти
                </Link>
              </li>
              <li>
                <Link to="/registration">Регистрация</Link>
              </li>
            </> }

          { userInfo.loggedIn
            && (userInfo.role === 'admin'
              || userInfo.role === 'moderator')
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
