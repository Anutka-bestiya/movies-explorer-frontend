import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
   
  return (
    <main className="movies" aria-label="Галерея фильмов">
      <SearchForm
        movies={props.movies}
        isShortCheckActive={props.isShortCheckActive}
        handleShortCheck={props.handleShortCheck}
        buttonText={props.buttonText}
        buttonTextProgress={props.buttonTextPrpgress}
      />
      <span className="movies__span"></span>
      <MoviesCardList
        onMovieLike={props.onMovieLike}
        onMovieDelete={props.onMovieDelete}
        views={props.views}
        movies={props.movies}
        savedMovies={props.savedMovies}
        movieButtonClassName={props.movieButtonClassName}
        handleMoreClick={props.handleMoreClick}
        movieSaveButton={props.movieSaveButton}
        movieDislikeButton={props.movieDislikeButton}
      />
    </main>
  );
}

export default Movies;
