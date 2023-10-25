import React from 'react';
import { useLocation } from 'react-router-dom';
import { moviesList } from '../../utils/config';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  //   const moviesList = props.movies;

  const movies = moviesList.filter(i => {
    if (i.likes === currentUser._id) {
      return i;
    }
  });

  return (
    <section className="section saved-movies" aria-label="Галерея фильмов">
      <SearchForm
        movies={movies}
        isShortCheckActive={props.isShortCheckActive}
        handleShortCheck={props.handleShortCheck}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextPrpgress}
      />
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

export default SavedMovies;
