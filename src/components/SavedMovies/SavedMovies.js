import React from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  const isLoading = React.useContext(LoadingContext);
  const [filtredSavedMovies, setFiltredSavedMovies] = React.useState([]);
  const [filtredSavedMoviesError, setFiltredSavedMoviesError] = React.useState('');

  React.useEffect(() => {
    setFiltredSavedMovies(props.savedMovies);
  }, [props.savedMovies]);

  const handleSetFiltredSavedMovies = movies => {
    setFiltredSavedMovies(movies);
  };

  const handleSetFiltredSavedMoviesError = err => {
    setFiltredSavedMoviesError(err);
  };

  return (
    <main className='saved-movies movies' aria-label='Галерея фильмов'>
      <SearchForm
        movies={props.savedMovies}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextProgress}
        handleSetIsLoading={props.handleSetIsLoading}
        filtredMovies={filtredSavedMovies}
        filtredMoviesError={filtredSavedMoviesError}
        handleSetFiltredMovies={handleSetFiltredSavedMovies}
        handleSetFiltredMoviesError={handleSetFiltredSavedMoviesError}
      />
      <span className={`error movies__span ${filtredSavedMovies !== ''}&& error_visible`}>
        {filtredSavedMoviesError}
      </span>
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          onMovieLike={props.onMovieLike}
          onMovieDelete={props.onMovieDelete}
          views={props.views}
          movies={filtredSavedMovies}
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
