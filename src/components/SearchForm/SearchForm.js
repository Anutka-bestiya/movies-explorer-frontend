import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import { Link } from 'react-router-dom';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SearchForm(props) {
  return (
    <section className="section search-form">
      <div className="form search-form__block">
        <div className="search-form__icon"></div>
        <input
          type="text"
          className="text form__input search-form__input"
          required
          id="search-form"
          name="search-form"
          //   value={formValue.search-form}
          //   onChange={handleChange}
          placeholder="Фильм"
        />
        <button
          type="submit"
          className="form__button button search-form__button"
          value="Отправить форму сейчас"
          // onClick={props.onInfoTooltip}
        >
          {props.buttonText}
          {/* {props.isLoading ? props.buttonTextProgress : props.buttonText} */}
          <div className="sr-only">{props.buttonText}</div>
        </button>
      </div>
      <FilterCheckbox
        isShortCheckActive={props.isShortCheckActive}
        handleShortCheck={props.handleShortCheck}
      />
    </section>
  );
}
export default SearchForm;
