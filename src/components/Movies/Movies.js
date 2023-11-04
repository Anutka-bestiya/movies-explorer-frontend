import React from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const [filtredMovies, setFiltredMovies] = React.useState([]);
  const isLoading = React.useContext(LoadingContext);
  const handleSetFiltredMovies = movies => {
    setFiltredMovies(movies);
  };

  return (
    <main className='movies' aria-label='Галерея фильмов'>
      <SearchForm
        movies={props.movies}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextProgress}
        handleSetIsLoading={props.handleSetIsLoading}
        filtredMovies={filtredMovies}
        handleSetFiltredMovies={handleSetFiltredMovies}
      />
      <span className='error movies__error'></span>
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
