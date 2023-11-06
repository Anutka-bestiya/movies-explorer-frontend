import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SHORT_DURATION } from '../../utils/config';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { LoadingContext } from '../../contexts/LoadingContext';
import { useValidate } from '../../utils/use-validate';

function SearchForm(props) {
  const location = useLocation();
  const isLoading = React.useContext(LoadingContext);
  const [isShortCheckActive, setIsShortCheckActive] = React.useState(false);
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

  // Получение значений прошлого поиска для movies
  React.useEffect(() => {
    if (location.pathname === '/movies' && localStorage.filtredMovies) {
      const filteredMov = JSON.parse(localStorage.getItem('filtredMovies'));
      const shortCheckActive = JSON.parse(localStorage.getItem('isShortCheckActive'));
      const formValueFiltred = JSON.parse(localStorage.getItem('formValue'));

      if (filteredMov !== null) {
        props.handleSetFiltredMovies(filteredMov);
        setIsShortCheckActive(shortCheckActive);
        resetForm({ search: formValueFiltred });
      }
    }
  }, []);

  // Фильтрация поискового запроса
  const startFilter = useCallback((movies, isShortCheckActive, formValue) => {
    const filtredMovies = movies.filter(movie => {
      if (formValue !== undefined) {
        const searchMovie =
          movie.nameRU.toLowerCase().includes(formValue.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(formValue.toLowerCase());
        return isShortCheckActive ? movie.duration <= SHORT_DURATION && searchMovie : searchMovie;
      } else {
        return isShortCheckActive ? movie.duration <= SHORT_DURATION && movie : movie;
      }
    });

    if (filtredMovies.length === 0) {
      props.handleSetFiltredMoviesError('Ничего не найдено');
    } else {
      props.handleSetFiltredMoviesError('');
    }

    props.handleSetFiltredMovies(filtredMovies);

    if (location.pathname === '/movies') {
      localStorage.setItem('filtredMovies', JSON.stringify(filtredMovies));
      localStorage.setItem('isShortCheckActive', JSON.stringify(isShortCheckActive));
      localStorage.setItem('formValue', JSON.stringify(formValue));
    }
  }, []);

  // Поиск фильмов
  const handleSearch = formValue => {
    props.handleSetIsLoading(true);
    startFilter(props.movies, isShortCheckActive, formValue);
    props.handleSetIsLoading(false);
  };

  // Переключение чекбокса короткометражек
  const handleShortCheck = () => {
    if (formValue) {
      props.handleSetIsLoading(true);
      if (isShortCheckActive) {
        setIsShortCheckActive(false);
      } else {
        setIsShortCheckActive(true);
      }
      startFilter(props.movies, !isShortCheckActive, formValue.search);
      props.handleSetIsLoading(false);
    }
  };

  // Нажатие на кнопку поиск
  const handleSubmit = e => {
    e.preventDefault();
    if (formValue) {
      handleSearch(formValue.search);
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
          value={formValue.search || ''}
          onChange={handleChange}
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
      <FilterCheckbox isShortCheckActive={isShortCheckActive} handleShortCheck={handleShortCheck} />
      <span className={`text error search-form__error ${isValid.name}&& error_visible`}>
        {errorMessage.search}
      </span>
    </section>
  );
}
export default SearchForm;
