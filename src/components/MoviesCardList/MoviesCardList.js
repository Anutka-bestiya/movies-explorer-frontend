import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  defaultViews,
  defaultViewsLg,
  defaultViewsSm,
  defaultViewsGap,
  defaultViewsLgGap,
  defaultViewsSmGap
} from '../../utils/config';
import { useResize } from '../../utils/use-resize';

function MoviesCardList(props) {
  const location = useLocation();
  // const views = props.views;

  // Используем хук определяющий масштаб экрана
  const { isScreenSm, isScreenLg } = useResize();

  // Количество отображаемых, добавляемых элементов:
  const [views, setViews] = React.useState(defaultViews);

  const determiningScale = () => {
    if (!isScreenSm) {
      setViews(defaultViewsSm);
    } else {
      if (!isScreenLg) {
        setViews(defaultViewsLg);
      } else {
        setViews(defaultViews);
      }
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      determiningScale();
    });
  }, [isScreenSm, isScreenLg, props.movies]);

  // Клик по кнопке "Еще"
  const handleMoreClick = () => {
    if (!isScreenSm) {
      if (views === defaultViewsSm) {
        setViews(defaultViewsSm + defaultViewsSmGap);
      } else {
        setViews(views + defaultViewsSmGap);
      }
    } else {
      if (!isScreenLg) {
        if (views === defaultViewsLg) {
          setViews(defaultViewsLg + defaultViewsLgGap);
        } else {
          setViews(views + defaultViewsLgGap);
        }
      } else {
        if (views === defaultViews) {
          setViews(defaultViews + defaultViewsGap);
        } else {
          setViews(views + defaultViewsGap);
        }
      }
    }
  };

  // Расчет длины отображаемого количества карточек
  const moviesCardList = movies => {
    if (movies !== null) {
      if (location.pathname === '/movies' && movies.length >= views) {
        return movies.slice(0, views);
      } else {
        return movies;
      }
    }
  };

  return (
    <section className='section movies-list' aria-label='Галерея фильмов'>
      {props.movies === null ? (
        <p className='title movies__text'>{props.errorMessage}</p>
      ) : (
        <>
          <ul className='movies-list__list'>
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
          <div className='movies-list__more'>
            {location.pathname !== '/saved-movies' && props.movies.length > views && (
              <button
                className='button movies-list__button'
                onClick={() => {
                  handleMoreClick();
                }}
                type='button'
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
