import React from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const [filtredMovies, setFiltredMovies] = React.useState([]);
  const [filtredMoviesError, setFiltredMoviesError] = React.useState('');
  const isLoading = React.useContext(LoadingContext);

  const handleSetFiltredMovies = movies => {
    setFiltredMovies(movies);
  };
  const handleSetFiltredMoviesError = err => {
    setFiltredMoviesError(err);
  };

  return (
    <main className='movies' aria-label='Галерея фильмов'>
      <SearchForm
        movies={props.movies}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextProgress}
        handleSetIsLoading={props.handleSetIsLoading}
        filtredMovies={filtredMovies}
        filtredMoviesError={filtredMoviesError}
        handleSetFiltredMovies={handleSetFiltredMovies}
        handleSetFiltredMoviesError={handleSetFiltredMoviesError}
      />
      <span className={`error movies__span ${filtredMovies !== ''}&& error_visible`}>
        {filtredMoviesError}
      </span>
      {isLoading ? (
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
