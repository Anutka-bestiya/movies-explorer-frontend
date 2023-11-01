import { MOVIE_URL } from './config';

function checkRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then(res => {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }
}

// запрос фильмов
export async function getInitialMovies() {
  return await fetch(MOVIE_URL).then(res => checkRes(res));
}
