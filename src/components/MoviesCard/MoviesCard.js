import React from 'react';

function MoviesCard(props) {
  const movie = props.movie;

  // Определяем, сохранял ли пользователь фильм
  const isLiked = props.savedMovies && props.savedMovies.find(m => m.movieId === movie.movieId);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const movieLikeButtonClassName = `button movie__like ${
    isLiked ? props.movieButtonClassName : ''
  }`;

  // Текст кнопки "лайка"
  const movieLikeButtonText = `${!isLiked ? 'Сохранить' : ''}`;

  // Пересчет минуты в нужный формат ч и м
  const hours = Math.floor(movie.duration / 60);
  let minutes = movie.duration % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const convertMinsToTime = `${hours ? `${hours}ч` : ''} ${minutes}м`;

  return (
    <li className='movie'>
      <figure className='movie__card'>
        <button className='movie__button' type='button'>
          <div
            className={movieLikeButtonClassName}
            onClick={() => {
              !isLiked ? props.onMovieLike(movie) : props.onMovieDelete(movie);
            }}
          >
            {movieLikeButtonText}
          </div>
          <a href={movie.trailerLink} className='link movie__link' target='_blank' rel='noreferrer'>
            <img className='movie__image' src={movie.image} alt={movie.nameRU} />
          </a>
        </button>
        <figcaption className='movie__caption'>
          <p className='title movie__title'>{movie.nameRU}</p>
          <p className='text movie__duration'>{convertMinsToTime}</p>
        </figcaption>
      </figure>
    </li>
  );
}
export default MoviesCard;
