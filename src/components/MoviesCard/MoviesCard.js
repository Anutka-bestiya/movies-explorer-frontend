import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {
  const movie = props.movie;

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = movie.owner === currentUser._id;

  // Определяем, есть ли у фильма лайк, поставленный текущим пользователем
  const isLiked = movie.likes === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const movieLikeButtonClassName = `button movie__like ${
    isLiked ? props.movieButtonClassName : ''
  }`;

  // Текст кнопки "лайка"
  const movieLikeButtonText = `${
    !isLiked ? 'Сохранить' : ''
    // <div className="sr-only">Снять лайк</div>
  }`;

  // Пересчет минуты в нужный формат ч и м
  const hours = Math.floor(movie.duration / 60);
  let minutes = movie.duration % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const convertMinsToTime = `${hours ? `${hours}ч` : ''} ${minutes}м`;

  return (
    <li className="movie">
      <figure className="movie__card">
        <button
          className="movie__button"
          onClick={() => {
            // onMovieLike(movie);
          }}
        >
          <div className={movieLikeButtonClassName}>{movieLikeButtonText}</div>
          <img
            className="movie__image"
            src={movie.image}
            alt={movie.nameRU}
            //   onClick={() => {
            //     onMovieClick(movie.link);
            //   }}
          />
        </button>
        <figcaption className="movie__caption">
          <p className="title movie__title">{movie.nameRU}</p>
          <p className="text movie__duration">{convertMinsToTime}</p>
        </figcaption>
      </figure>
    </li>
  );
}
export default MoviesCard;
