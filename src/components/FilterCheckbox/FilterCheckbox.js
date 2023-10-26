import React from 'react';
// import { Link } from 'react-router-dom';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import icon_check_off from '../../images/icon_check_off.svg';
import icon_check_on from '../../images/icon_check_on.svg';

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <button
        className="button filter-checkbox__button"
        onClick={() => {
          props.handleShortCheck();
        }}
      >
        <img
          className="filter-checkbox__icon"
          src={props.isShortCheckActive ? icon_check_on : icon_check_off}
          alt="Чекбокс поиска короткометражных фильмов"
        />
        <div className="sr-only">Чекбокс поиска короткометражных фильмов</div>
      </button>
      Короткометражки
    </div>
  );
}
export default FilterCheckbox;
