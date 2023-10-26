import React from 'react';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const movies = props.movies;
  const viewsLength = 12;
  const moviesCardList = movies => {
    if (movies.length >= viewsLength) {
      // console.log(movies);
      return movies.slice(0, viewsLength);
    } else {
      // console.log(movies);
      return movies;
    }
  };
  console.log(moviesCardList(movies));

  return (
    <section className="section movies-list" aria-label="Галерея фильмов">
      <ul className="movies-list__list">
        {moviesCardList(movies).map(movie => (
          <MoviesCard
            key={movie._id}
            //   onMovieLike={props.onMovieLike}
            //   onMovieDelete={props.onMovieDelete}
            movie={movie}
            movieButtonClassName={props.movieButtonClassName}
            // movieSaveButton={props.movieSaveButton}
            // movieDislikeButton={props.movieDislikeButton}
          />
        ))}
      </ul>
      {movies.length > viewsLength && (
        <div className="movies-list__more">
          <button className="button movies-list__button" onClick={() => {}}>
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}
export default MoviesCardList;
