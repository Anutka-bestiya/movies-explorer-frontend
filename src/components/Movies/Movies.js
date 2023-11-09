import React, { useCallback } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { SHORT_DURATION, BASE_MOVIE_URL } from '../../utils/config';
import { useValidate } from '../../utils/use-validate';
import * as moviesApi from '../../utils/MoviesApi';

function Movies(props) {
  const [isSearch, setIsSearch] = React.useState(false);
  const [filtredMovies, setFiltredMovies] = React.useState([]);
  const [filtredMoviesError, setFiltredMoviesError] = React.useState('');
  const [isShortCheckActive, setIsShortCheckActive] = React.useState(false);
  const [firstSearch, setFirstSearch] = React.useState(true);
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

  const handleSetFiltredMovies = movies => {
    setFiltredMovies(movies);
  };

  const handleSetFiltredMoviesError = err => {
    setFiltredMoviesError(err);
  };

  // Получение значений прошлого поиска для movies
  React.useEffect(() => {
    if (localStorage.allMovies) {
      const allMoviesLS = JSON.parse(localStorage.getItem('allMovies'));
      props.handleSetMovies(allMoviesLS);
    }
    if (localStorage.filtredMovies && localStorage.isShortCheckActive && localStorage.formValue) {
      const lastFilteredMovies = JSON.parse(localStorage.getItem('filtredMovies'));
      const shortCheckActive = JSON.parse(localStorage.getItem('isShortCheckActive'));
      const formValueFiltred = JSON.parse(localStorage.getItem('formValue'));

      if (lastFilteredMovies.length !== 0) {
        setFiltredMovies(lastFilteredMovies);
        setIsShortCheckActive(shortCheckActive);
        resetForm({ search: formValueFiltred });
        setFirstSearch(false);
      }
    }
  }, []);

  // Фильтрация поискового запроса
  const startFilter = useCallback((moviesFilter, isShortCheckActive, formValue) => {
    const filtredMovies = moviesFilter.filter(movie => {
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
      setFiltredMoviesError('Ничего не найдено');
    } else {
      setFiltredMoviesError('');
    }

    setFiltredMovies(filtredMovies);

    localStorage.setItem('filtredMovies', JSON.stringify(filtredMovies));
    localStorage.setItem('isShortCheckActive', JSON.stringify(isShortCheckActive));
    localStorage.setItem('formValue', JSON.stringify(formValue));
  }, []);

  // Поиск фильмов
  function handleSearch(formValue, isShortCheck) {
    if (props.movies.length === 0) {
      setIsSearch(true);
      moviesApi
        .getInitialMovies()
        .then(movies => {
          const allMoviesIn = movies.map(m => {
            return {
              country: m.country,
              description: m.description,
              duration: m.duration,
              director: m.director,
              movieId: m.id,
              image: `${BASE_MOVIE_URL}${m.image.url}`,
              nameEN: m.nameEN,
              nameRU: m.nameRU,
              trailerLink: m.trailerLink,
              year: m.year,
              thumbnail: `${BASE_MOVIE_URL}${m.image.formats.thumbnail.url}`
            };
          });
          props.handleSetMovies(allMoviesIn);
          localStorage.setItem('allMovies', JSON.stringify(allMoviesIn));
          console.log('Фильмы получены со стороннего ресурса и загружены в локалстораж');
          setFirstSearch(false);
          startFilter(allMoviesIn, isShortCheck, formValue);
        })
        .catch(err => {
          console.log(`Ошибка получения массива movies: ${err}`);
        })
        .finally(() => setIsSearch(false));
    } else {
      startFilter(props.movies, isShortCheck, formValue);
    }
  }

  return (
    <main className='movies' aria-label='Галерея фильмов'>
      <SearchForm
        movies={props.movies}
        handleSearch={handleSearch}
        firstSearch={firstSearch}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextProgress}
        filtredMoviesError={filtredMoviesError}
        isShortCheckActive={isShortCheckActive}
        setIsShortCheckActive={setIsShortCheckActive}
        handleSetFiltredMovies={handleSetFiltredMovies}
        handleSetFiltredMoviesError={handleSetFiltredMoviesError}
        formValue={formValue}
        handleChange={handleChange}
        isValid={isValid}
        errorMessage={errorMessage}
      />
      {firstSearch && <p className='movies__span '>Введите поисковой запрос</p>}
      <span className={`error movies__span ${filtredMovies !== ''}&& error_visible`}>
        {filtredMoviesError}
      </span>
      {isSearch ? (
        <Preloader />
      ) : (
        <MoviesCardList
          onMovieLike={props.onMovieLike}
          onMovieDelete={props.onMovieDelete}
          views={props.views}
          movies={filtredMovies}
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

export default Movies;
