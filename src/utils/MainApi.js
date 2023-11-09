import { BASE_URL, HEADERS } from './config';

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

//запрос и изменение данных о пользователе
export function getUserInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include' // куки посылаются вместе с запросом
  }).then(res => checkRes(res));
}

export function setUserInfo({ name, email }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: HEADERS,
    credentials: 'include', // куки посылаются вместе с запросом
    body: JSON.stringify({ name, email })
  }).then(res => checkRes(res));
}

// запрос фильмов
export async function getSavedMovie() {
  return await fetch(`${BASE_URL}/movies`, {
    credentials: 'include' // куки посылаются вместе с запросом
  }).then(res => checkRes(res));
}

// добавление сохраненных фильмов
export async function addSavedMovie(movie) {
  return await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: HEADERS,
    credentials: 'include', // куки посылаются вместе с запросом
    body: JSON.stringify(movie)
  }).then(res => checkRes(res));
}

// удаление сохраненных фильмов
export async function deleteSavedMovie(_id) {
  return await fetch(`${BASE_URL}/movies/${_id}`, {
    method: 'DELETE',
    headers: HEADERS,
    credentials: 'include' // куки посылаются вместе с запросом
  }).then(res => checkRes(res));
}
