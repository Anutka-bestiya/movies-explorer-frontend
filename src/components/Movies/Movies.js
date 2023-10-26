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
    <section className="section movies" aria-label="Галерея фильмов">
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
        movies={movies}
        movieButtonClassName={props.movieButtonClassName}
        // movieSaveButton={props.movieSaveButton}
        // movieDislikeButton={props.movieDislikeButton}
      />
    </section>
  );
}

export default Movies;
