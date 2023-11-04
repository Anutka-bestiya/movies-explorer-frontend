import React from 'react';
import { useLocation } from 'react-router-dom';
import { SHORT_DURATION } from '../../utils/config';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { LoadingContext } from '../../contexts/LoadingContext';

function SearchForm(props) {
  const location = useLocation();
  const isLoading = React.useContext(LoadingContext);
  const [isShortCheckActive, setIsShortCheckActive] = React.useState(false);
  const [formValue, setFormValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const filtred = JSON.parse(localStorage.getItem('filtredMovies'));
  const shortCheckActive = JSON.parse(localStorage.getItem('isShortCheckActive'));
  const formValueFiltred = JSON.parse(localStorage.getItem('formValue'));

  React.useEffect(() => {
    if (location.pathname === '/movies' && filtred !== null) {
      props.handleSetFiltredMovies(filtred);
      setIsShortCheckActive(shortCheckActive);
      setFormValue(formValueFiltred);
    } else {
      setIsShortCheckActive(isShortCheckActive);
      props.handleSetFiltredMovies(props.movies);
    }
  }, []);

  // Переключение чекбокса короткометражек
  const handleShortCheck = () => {
    isShortCheckActive ? setIsShortCheckActive(false) : setIsShortCheckActive(true);
  };

  // Поиск фильмов
  const handleSubmit = e => {
    e.preventDefault();
    props.handleSetIsLoading(true);

    const filtredCheckMovies = isShortCheckActive
      ? props.movies.filter(m => m.duration <= SHORT_DURATION)
      : props.movies;

    const filtred = filtredCheckMovies.filter(movie => {
      return (
        movie.nameRU.toLowerCase().includes(formValue.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(formValue.toLowerCase())
      );
    });

    props.handleSetFiltredMovies(filtred);

    location.pathname === '/movies' &&
      localStorage.setItem('filtredMovies', JSON.stringify(filtred));
    location.pathname === '/movies' &&
      localStorage.setItem('isShortCheckActive', JSON.stringify(isShortCheckActive));
    location.pathname === '/movies' && localStorage.setItem('formValue', JSON.stringify(formValue));

    props.handleSetIsLoading(false);
  };

  // Получение значения поля поиска
  const handleChange = e => {
    const { value } = e.target;

    setFormValue(value);
  };

  return (
    <section className='section search-form'>
      <div className='form search-form__block'>
        <div className='search-form__icon'></div>
        <input
          type='text'
          className='text form__input search-form__input'
          required
          id='search-form'
          name='search-form'
          value={formValue}
          onChange={handleChange}
          placeholder='Фильм'
        />
        <button
          type='submit'
          className='form__button button search-form__button'
          value='Отправить форму сейчас'
          onClick={handleSubmit}
        >
          {/* {props.buttonText} */}
          {isLoading ? props.buttonTextProgress : props.buttonText}
          <div className='sr-only'>{props.buttonText}</div>
        </button>
      </div>
      <FilterCheckbox
        isShortCheckActive={isShortCheckActive}
        handleShortCheck={handleShortCheck}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}
export default SearchForm;
