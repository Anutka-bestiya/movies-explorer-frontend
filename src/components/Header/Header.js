import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { LoggedInContext } from '../contexts/LoggedInContext';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

import logo from '../../images/logo.png';
import icon_profile from '../../images/icon_profile.png';

function Header({}) {
  //   const isLoggedIn = React.useContext(LoggedInContext);
  //   const currentUser = React.useContext(CurrentUserContext);
  //   const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={`header section ${location.pathname} === '/' && header_theme_pink`}>
      <a className="link" href="/">
        <img src={logo} alt="Логотип: Дипломный проект" className="logo header__logo" />
      </a>
      {/* {isLoggedIn ? ( */}
      {/* <nav className="header__nav">
        <Link to="/movies" className="link text header__nav-item ">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="link text header__nav-item ">
          Сохранённые фильмы
        </Link>
        <Link to="/profile" className="link header__nav-item text header__profile">
          Аккаунт
          <img src={icon_profile} alt="Иконка профиля" className="header__icon-profile" />
        </Link>
      </nav> */}
      {/* ) : ( */}
      <nav className="header__nav">
        <Link to="/signup" className="link text header__nav-item header__reg-link">
          Регистрация
        </Link>
        <Link to="/signin" className=" button header__nav-item header__nav-button">
          Войти
        </Link>
      </nav>
      {/* )} */}
    </header>
  );
}

export default Header;
