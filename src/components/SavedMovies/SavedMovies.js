import React, { useCallback } from 'react';
import { SHORT_DURATION } from '../../utils/config';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useValidate } from '../../utils/use-validate';
import * as mainApi from '../../utils/MainApi';

function SavedMovies(props) {
  const [isSearch, setIsSearch] = React.useState(false);
  const [filtredSavedMoviesError, setFiltredSavedMoviesError] = React.useState('');
  const [isShortCheckActive, setIsShortCheckActive] = React.useState(false);
  const [firstSearch, setFirstSearch] = React.useState(true);
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

  const filtredSavedMovies = props.filtredSavedMovies;
  const setFiltredSavedMovies = props.handleSetFiltredSavedMovies;

  const handleSetFiltredSavedMoviesError = err => {
    setFiltredSavedMoviesError(err);
  };

  React.useEffect(() => {
    const filtredSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    setFiltredSavedMovies(filtredSavedMovies);
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
      setFiltredSavedMoviesError('Ничего не найдено');
    } else {
      setFiltredSavedMoviesError('');
    }

    setFiltredSavedMovies(filtredMovies);
    localStorage.setItem('filtredSavedMovies', JSON.stringify(filtredMovies));
  }, []);

  // Поиск фильмов
  function handleSearch(formValue, isShortCheck) {
    setIsSearch(true);
    mainApi
      .getSavedMovie()
      .then(savedMoviesIn => {
        props.handleSetSavedMovies(savedMoviesIn);
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesIn));
        console.log('Фильмы пользователя получены и загружены в локалстораж');
        setFirstSearch(false);
        startFilter(savedMoviesIn, isShortCheck, formValue);
      })
      .catch(err => {
        console.log(`Ошибка получения массива saved movies: ${err}`);
      })
      .finally(() => setIsSearch(false));
  }

  return (
    <main className='saved-movies movies' aria-label='Галерея фильмов'>
      <SearchForm
        movies={props.savedMovies}
        handleSearch={handleSearch}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextProgress}
        filtredMoviesError={filtredSavedMoviesError}
        isShortCheckActive={isShortCheckActive}
        setIsShortCheckActive={setIsShortCheckActive}
        handleSetFiltredMovies={props.handleSetFiltredSavedMovies}
        handleSetFiltredMoviesError={handleSetFiltredSavedMoviesError}
        startFilter={startFilter}
        formValue={formValue}
        handleChange={handleChange}
        isValid={isValid}
        errorMessage={errorMessage}
      />
      {firstSearch &&
        (props.savedMovies.length === 0 ? (
          <span className='movies__span'>У вас нет сохраненных фильмов</span>
        ) : (
          ''
        ))}
      {filtredSavedMovies && (
        <span
          className={`error movies__span ${filtredSavedMovies.length === 0 ? 'error_visible' : ''}`}
        >
          {filtredSavedMoviesError}
        </span>
      )}
      {isSearch ? (
        <Preloader />
      ) : (
        <MoviesCardList
          onMovieLike={props.onMovieLike}
          onMovieDelete={props.onMovieDelete}
          views={props.views}
          movies={props.filtredSavedMovies}
          savedMovies={props.savedMovies}
          movieButtonClassName={props.movieButtonClassName}
          handleMoreClick={props.handleMoreClick}
          movieSaveButton={props.movieSaveButton}
          movieDislikeButton={props.movieDislikeButton}
        />
      )}
    </main>
  );
}

export default SavedMovies;
