import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { LoadingContext } from '../../contexts/LoadingContext';

function SearchForm(props) {
  const isLoading = React.useContext(LoadingContext);

  // Переключение чекбокса короткометражек
  const handleShortCheck = () => {
    if (props.isShortCheckActive) {
      props.setIsShortCheckActive(false);
    } else {
      props.setIsShortCheckActive(true);
    }
    if (!props.firstSearch) {
      if (props.formValue) {
        props.handleSearch(props.formValue.search, !props.isShortCheckActive);
      }
    }
  };

  // Нажатие на кнопку поиск
  const handleSubmit = e => {
    e.preventDefault();

    if (props.formValue.search) {
      props.handleSearch(props.formValue.search, props.isShortCheckActive);
    } else {
    }
  };

  return (
    <section className='section search-form'>
      <form className='form search-form__block'>
        <div className='search-form__icon'></div>
        <input
          type='text'
          className='text form__input search-form__input'
          required
          id='search'
          name='search'
          value={props.formValue.search || ''}
          onChange={props.handleChange}
          placeholder='Фильм'
        />
        <button
          type='submit'
          className='form__button button search-form__button'
          value='Отправить форму сейчас'
          onClick={e => {
            handleSubmit(e);
          }}
        >
          {isLoading ? props.buttonTextProgress : props.buttonText}
          <div className='sr-only'>{props.buttonText}</div>
        </button>
      </form>
      <FilterCheckbox
        isShortCheckActive={props.isShortCheckActive}
        handleShortCheck={handleShortCheck}
      />
      <span className={`text error search-form__error ${props.isValid.search}&& error_visible`}>
        {props.errorMessage.search}
      </span>
    </section>
  );
}
export default SearchForm;
