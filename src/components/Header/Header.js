import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { LoggedInContext } from '../../contexts/LoggedInContext';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

import logo from '../../images/logo.png';
import icon_profile from '../../images/icon_profile.svg';
import icon_main from '../../images/icon_main.svg';

function Header(props) {
  const isLoggedIn = React.useContext(LoggedInContext);
  const setIsMenuBurgerOpen = props.setIsMenuBurgerOpen;
  //   const currentUser = React.useContext(CurrentUserContext);
  //   const navigate = useNavigate();
  const location = useLocation();

  return (
    (location.pathname === '/' ||
      location.pathname === '/profile' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies') && (
      <header className={`header section ${location.pathname === '/' && 'header_theme_pink'}`}>
        <a className="link" href="/">
          <img src={logo} alt="Логотип: Дипломный проект" className="logo header__logo" />
        </a>
        {!isLoggedIn ? (
          <>
            <nav className="header__nav nav-is-logged_true">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `link text header__nav-item ${isActive ? 'header__nav-item_active' : ''}`
                }
              >
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  `link text header__nav-item ${isActive ? 'header__nav-item_active' : ''}`
                }
              >
                Сохранённые фильмы
              </NavLink>
              <NavLink to="/profile" className="link header__nav-item text header__profile">
                Аккаунт
                <div
                  className={`header__icon-profile ${
                    location.pathname !== '/' && 'header__icon-profile_theme_pink'
                  }`}
                >
                  <img
                    src={`${location.pathname !== '/' ? icon_main : icon_profile}`}
                    alt="Иконка профиля"
                  />
                </div>
              </NavLink>
            </nav>
            <button className="button header__menu-burger" onClick={setIsMenuBurgerOpen}>
              <span className="header__menu-burger-block">
                <div className="sr-only">Меню навигации</div>
              </span>
            </button>
            {props.children}
            {/* <Navigation /> */}
          </>
        ) : (
          <nav className="header__nav nav-is-logged_false">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `link text header__nav-item header__reg-link ${
                  isActive ? 'header__nav-item_active' : ''
                }`
              }
            >
              Регистрация
            </NavLink>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `button header__nav-item header__nav-button ${
                  isActive ? 'header__nav-item_active' : ''
                }`
              }
            >
              Войти
            </NavLink>
          </nav>
        )}
      </header>
    )
  );
}

export default Header;
