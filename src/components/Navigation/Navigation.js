import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import icon_main from '../../images/icon_main.svg';

function Navigation(props) {
  const location = useLocation();

  return (
    <div className={` header__burger ${props.isOpen ? 'header__burger_opened' : ''}`}>
      <nav className="header__nav header__burger-nav">
        <button className=" button button-close" onClick={props.onClose}>
          <div className="sr-only">Закрыть</div>
        </button>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `link text header__burger-item ${isActive ? 'header__burger-item_active' : ''}`
          }
          onClick={props.onClose}
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `link text header__burger-item ${isActive ? 'header__burger-item_active' : ''}`
          }
          onClick={props.onClose}
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `link text header__burger-item ${isActive ? 'header__burger-item_active' : ''}`
          }
          onClick={props.onClose}
        >
          Сохранённые фильмы
        </NavLink>
        <NavLink
          to="/profile"
          className="link header__burger-item text header__profile header__burger-profile"
          onClick={props.onClose}
        >
          Аккаунт
          <div className="header__icon-profile header__burger-icon-profile">
            <img src={icon_main} alt="Иконка профиля" />
          </div>
        </NavLink>
      </nav>
    </div>
  );
}

export default Navigation;
