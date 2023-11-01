import tridcat_tri_slova_o_dizajne from '../images/33_slova_o_dizajne.png';
import kinoalmanah from '../images/kinoalmanah.png';
import v_pogone_za_benksi from '../images/v_pogone_za_benksi.png';
import baskiya from '../images/baskiya.png';
import beg_eto_svoboda from '../images/beg_eto_svoboda.png';
import knigotorgovcu from '../images/knigotorgovcu.png';
import kogda_ya_dumaiy from '../images/kogda_ya_dumaiy.png';
import gimme_danger from '../images/gimme_danger.png';
import jenis from '../images/jenis.png';
import soberis from '../images/soberis.png';
import pi_djei_kharvi from '../images/pi_djei_kharvi.png';
import po_volnam from '../images/po_volnam.png';

const moviesList = [
  {
    _id: '650cb3411682f9a4ea25be3d',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${tridcat_tri_slova_o_dizajne}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1111,
    nameRU: '33 слова о дизайне',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '660cb3521682f9a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${kinoalmanah}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea26be39',
    movieId: 1112,
    nameRU: 'Киноальманах «100 лет дизайна»',
    nameEN: '1rrr1',
    likes: '650cb2d21682f9a4ea25be39'
  },
  {
    _id: '650cb3521682f9a4ea27be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${v_pogone_za_benksi}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1113,
    nameRU: 'В погоне за Бенкси',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '650cb3521682f9a4ea35be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${baskiya}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1114,
    nameRU: 'Баския: Взрыв реальности',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '666cb3521682f9a7ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 17,
    year: '1111',
    description: 'hhh',
    image: `${beg_eto_svoboda}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1115,
    nameRU: 'Бег это свобода',
    nameEN: '1rrr1',
    likes: '650cb2d21682f9a4ea25be39'
  },
  {
    _id: '660cb3521682f9a8ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 16,
    year: '1111',
    description: 'hhh',
    image: `${knigotorgovcu}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1116,
    nameRU: 'Книготорговцы',
    nameEN: '1rrr1',
    likes: '650cb2d21682f9a4ea25be39'
  },
  {
    _id: '671cb3521682f8a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${kogda_ya_dumaiy}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1117,
    nameRU: 'Когда я думаю о Германии ночью',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '672cb3521682f8a8ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${gimme_danger}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1118,
    nameRU: 'Gimme Danger: История Игги и The Stooges',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '673cb3521682f978ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${jenis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1119,
    nameRU: 'Дженис: Маленькая девочка грустит',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '674cb3521682f987ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${soberis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1120,
    nameRU: 'Соберись перед прыжком',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '675cb3521682f988ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${pi_djei_kharvi}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1121,
    nameRU: 'Пи Джей Харви: A dog called money',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '676cb3521682f3a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${po_volnam}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1122,
    nameRU: 'По волнам: Искусство звука в кино',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '677cb3521682f4a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 6,
    year: '1111',
    description: 'hhh',
    image: `${soberis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1123,
    nameRU: '11rr1123r',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '678cb3521682f5a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 28,
    year: '1111',
    description: 'hhh',
    image: `${soberis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1124,
    nameRU: '11rrr24',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '679cb3521682f6a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 77,
    year: '1111',
    description: 'hhh',
    image: `${soberis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1125,
    nameRU: '11rrr25',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '681cb3521682f7a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 62,
    year: '1111',
    description: 'hhh',
    image: `${po_volnam}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1126,
    nameRU: '11rrr16',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '682cb3521682f8a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 45,
    year: '1111',
    description: 'hhh',
    image: `${po_volnam}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1127,
    nameRU: '11rrr17',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '683cb3521682f114ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 89,
    year: '1111',
    description: 'hhh',
    image: `${po_volnam}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1128,
    nameRU: '11rrr18',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '684cb352168211a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 78,
    year: '1111',
    description: 'hhh',
    image: `${soberis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1122,
    nameRU: '11rrr19',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '685cb352168449a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 61,
    year: '1111',
    description: 'hhh',
    image: `${soberis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1122,
    nameRU: '11rrr20 2020202020202020202020202202020202020202020002022020202020',
    nameEN: '1rrr1',
    likes: ''
  },
  {
    _id: '686cb3521332f9a4ea25be3f',
    country: 'krrr',
    director: 'ttt',
    duration: 20,
    year: '1111',
    description: 'hhh',
    image: `${soberis}`,
    trailerLink: 'https://ya.ru',
    thumbnail: 'http://ya.ru',
    owner: '650cb2d21682f9a4ea25be39',
    movieId: 1122,
    nameRU: '11rrr 21',
    nameEN: '1rrr1',
    likes: ''
  }
];

const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const BASE_MOVIE_URL = 'https://api.nomoreparties.co';
// const BASE_URL = 'http://api.movie-anchikfyz.nomoredomainsrocks.ru';
const BASE_URL = 'http://localhost:4000';
const HEADERS = {
  'Content-Type': 'application/json'
};

const defaultViews = 12;
const defaultViewsLg = 8;
const defaultViewsSm = 5;

export {
  moviesList,
  MOVIE_URL,
  BASE_MOVIE_URL,
  BASE_URL,
  HEADERS,
  defaultViews,
  defaultViewsLg,
  defaultViewsSm
};
