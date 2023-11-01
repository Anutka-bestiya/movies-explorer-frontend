import React from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingContext } from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const isLoading = React.useContext(LoadingContext);
  const location = useLocation();

  const views = props.views;
  
  const moviesCardList = (movies) => {
    if (location.pathname === '/saved-movies'){ return props.savedMovies} else
  if ((location.pathname !== '/saved-movies') ||
    (movies !== null)) {
      if (movies.length >= views) {
              return movies.slice(0, views);
      } else {
               return movies;
      }
    } 
  };
  
  return (
    <section className="section movies-list" aria-label="Галерея фильмов">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <ul className="movies-list__list">
            {moviesCardList(props.movies).map(movie => (
              <MoviesCard
                key={movie.movieId}
                onMovieLike={props.onMovieLike}
                onMovieDelete={props.onMovieDelete}
                movie={movie}
                movies={props.movies}
                savedMovies={props.savedMovies}
                movieButtonClassName={props.movieButtonClassName}
                movieSaveButton={props.movieSaveButton}
                movieDislikeButton={props.movieDislikeButton}
              />
            ))}
          </ul>
          <div className="movies-list__more">
          {(location.pathname !== '/saved-movies') && (props.movies.length > views) && (
              <button
                className="button movies-list__button"
                onClick={() => {
                  props.handleMoreClick();
                }}
                type="button"
              >
                Ещё
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
