import React from 'react';
import { useLocation } from 'react-router-dom';
import { moviesList } from '../../utils/config';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const location = useLocation();
  // const movies = props.movies;
  const movies = moviesList;

  return (
    <main className="movies" aria-label="Галерея фильмов">
      <SearchForm
        movies={movies}
        isShortCheckActive={props.isShortCheckActive}
        handleShortCheck={props.handleShortCheck}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextPrpgress}
      />
      <span className="movies__span"></span>
      <MoviesCardList
        // onMovieLike={onMovieLike}
        // onMovieDelete={onMovieDelete}
        views={props.views}
        movies={movies}
        movieButtonClassName={props.movieButtonClassName}
        handleMoreClick={props.handleMoreClick}
        // movieSaveButton={props.movieSaveButton}
        // movieDislikeButton={props.movieDislikeButton}
      />
    </main>
  );
}

export default Movies;
