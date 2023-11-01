import React from 'react';
import { Routes, Route, /*Navigate,*/ useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Navigation from '../Navigation/Navigation';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import { defaultViews, defaultViewsLg, defaultViewsSm, BASE_MOVIE_URL } from '../../utils/config';
import { useResize } from '../../utils/use-resize';
import { LoadingContext } from '../../contexts/LoadingContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  // Используем хук определяющий масштаб экрана
  const { isScreenSm, isScreenLg } = useResize();

  // Количество отображаемых, добавляемых элементов:
  const [views, setViews] = React.useState(12);

  const determiningScale = () => {
    if (!isScreenSm) {
      setViews(defaultViewsSm);
    } else {
      if (!isScreenLg) {
        setViews(defaultViewsLg);
      } else {
        setViews(12);
      }
    }
  };

  React.useEffect(() => {
    determiningScale();
  }, [isScreenSm, isScreenLg]);

  // Клик по кнопке "Еще"
  const handleMoreClick = () => {
    if (!isScreenSm) {
      if (views === defaultViewsSm) {
        setViews(defaultViewsSm + 1);
      } else {
        setViews(views + 1);
      }
    } else {
      if (!isScreenLg) {
        if (views === defaultViewsLg) {
          setViews(defaultViewsLg + 2);
        } else {
          setViews(views + 2);
        }
      } else {
        if (views === defaultViews) {
          setViews(defaultViews + 3);
        } else {
          setViews(views + 3);
        }
      }
    }
  };

  // Стейты
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Виталий',
    email: 'Почта пользователя',
    _id: '650cb2d21682f9a4ea25be39'
  });
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isShortCheckActive, setIsShortCheckActive] = React.useState(false);
  const [isMenuBurgerOpen, setIsMenuBurgerOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSucsess, setIsSucsess] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    mainApi
      .getUserInfo()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(`Ошибка получения currentUser: ${err}`);
      });

      console.log(currentUser)
  }, [isLoggedIn]);

  // Получение фильмов при авторизации пользователя
  React.useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('allMovies'));
    if (movies === null) {
      moviesApi
        .getInitialMovies()
        .then(allMovies => {
          const allMoviesForLS = allMovies.map(m => {
            return {
              country: m.country,
              description: m.description,
              duration: m.duration,
              director: m.director,
              movieId: m.id,
              image: `${BASE_MOVIE_URL}${m.image.url}`,
              nameEN: m.nameEN,
              nameRU: m.nameRU,
              trailerLink: m.trailerLink,
              year: m.year,
              thumbnail: `${BASE_MOVIE_URL}${m.image.formats.thumbnail.url}`
            };
          });
          setMovies(allMoviesForLS);
          localStorage.setItem('allMovies', JSON.stringify(allMoviesForLS));
          console.log('Фильмы получены со стороннего ресурса и загружены в локалстораж');
          // setIsLoading(false);
        })
        .catch(err => {
          console.log(`Ошибка получения массива movies: ${err}`);
        });
    } else {
      setMovies(movies);
      console.log(movies);     
    }
    
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies === null) {
    mainApi
      .getSavedMovie()
      .then(savedMoviesForLS => {
        setSavedMovies(savedMoviesForLS);
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesForLS));
        console.log(savedMovies);
      })
      .catch(err => {
        console.log(`Ошибка получения массива saved movies: ${err}`);
      });
    } else { 
      setSavedMovies(savedMovies);
      console.log(savedMovies);
    }
    // localStorage.clear();
    setIsLoading(false);
  }, [isLoggedIn]);

  // Функция проверки токена
  const tokenCheck = () => {
    auth
      .checkToken()
      .then(res => {
        setCurrentUser(res)
        setIsLoggedIn(true);
        navigate(location.pathname);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setIsLoggedIn(false);
        // navigate('/signin', { replace: true });
      });
  };

  // Проверка токена
  React.useEffect(() => {
    tokenCheck(); // проверка токена
  }, []);

  // Добавление сохраненного фильма
  const handleAddSavedMovie = newMovie => {
    mainApi
      .addSavedMovie(newMovie)
      .then(movie => {
        console.log(movie)
        const movieForLS = movie
        setSavedMovies([movieForLS, ...savedMovies]);
        return localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch(err => console.log(`Ошибка сохранения фильма: ${err}`));
  };

  // Удаление сохраненного фильма
  const handleDeleteSavedMovie = movie => {
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(m => {
          if (m._id !== movie._id) {
            return m;
          }
        });
        setSavedMovies(newSavedMovies);
        localStorage.removeItem('savedMovies');
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch(err => console.log(`Ошибка удаления Фильма: ${err}`));
  };

  // Переключение чекбокса короткометражек
  const handleShortCheck = () => {
    if (isShortCheckActive === false) setIsShortCheckActive(true);
    else {
      setIsShortCheckActive(false);
    }
  };

  // вход в приложение
  const handleLogin = boolean => {
    setIsLoggedIn(boolean);
    setIsSucsess(boolean);
  };

  // успех!
  function handleSetIsSucsess() {
    setIsSucsess(true);
  }

  // Сохранение сообщения в тултип 
  function handleSetMessage(e) {
    setMessage(e);
  }

  // Изменение статуса загрузки
  function handleSetIsLoading(boolean) {
    setIsLoading(boolean);
  }

  // Закрытие тултипа
  function handleCloseInfoTooltip(nav) {
    if (isSucsess) {
      navigate(nav, { replace: true });
    }
    setIsInfoTooltipOpen(false);
    setIsSucsess(false);
    setMessage('');
  }

  // Закрытие меню-бургер
  function closeMenuBurger() {
    setIsMenuBurgerOpen(false);
  }

  // Именование кнопок
  const movieButtonClassName = 'movie__like_liked';
  const savedMovieButtonClassName = 'movie__like_saved';
  const registerButtonClassName = '';
  const loginButtonClassName = '';

  return (
    <LoadingContext.Provider value={isLoading}>
      <LoggedInContext.Provider value={isLoggedIn}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="App page">
            <Header setIsMenuBurgerOpen={setIsMenuBurgerOpen}>
              <Navigation isOpen={isMenuBurgerOpen} onClose={closeMenuBurger} />
            </Header>
            <Routes>
              <Route
                path="/signin"
                element={
                  <Login
                    name="login"
                    title="Вход"
                    buttonText="Войти"
                    buttonTextProgress="Авторизация.."
                    buttonClass={loginButtonClassName}
                    onInfoTooltip={setIsInfoTooltipOpen}
                    handleSetMessage={handleSetMessage}
                    handleSetIsSucsess={handleSetIsSucsess}
                    handleSetIsLoading={handleSetIsLoading}
                    handleLogin={handleLogin}
                  >
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={handleCloseInfoTooltip}
                      isSucsess={isSucsess}
                      message={message}
                      nav="/"
                    />
                  </Login>
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    name="register"
                    title="Регистрация"
                    buttonText="Зарегистрироваться"
                    buttonTextProgress="Регистрация.."
                    buttonClass={registerButtonClassName}
                    onInfoTooltip={setIsInfoTooltipOpen}
                    handleSetMessage={handleSetMessage}
                    handleSetIsSucsess={handleSetIsSucsess}
                    handleSetIsLoading={handleSetIsLoading}
                  >
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={handleCloseInfoTooltip}
                      isSucsess={isSucsess}
                      message={message}
                      nav="/"
                    />
                  </Register>
                }
              />
              <Route path="/" element={<Main />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    name="profile"
                    title="Обновление данных"
                    buttonText="Редактировать"
                    buttonTextProgress="Сохранение.."
                    onInfoTooltip={setIsInfoTooltipOpen}
                    handleSetMessage={handleSetMessage}
                    handleSetIsSucsess={handleSetIsSucsess}
                    handleSetIsLoading={handleSetIsLoading}
                  >
                    <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={handleCloseInfoTooltip}
                    isSucsess={isSucsess}
                    message={message}
                    nav="/profile"
                    />
                  </Profile>
                }
              />
              <Route
                path="/movies"
                element={
                  <Movies
                    onMovieLike={handleAddSavedMovie}
                    onMovieDelete={handleDeleteSavedMovie}
                    views={views}
                    movies={movies}
                    savedMovies={savedMovies}
                    isShortCheckActive={isShortCheckActive}
                    handleShortCheck={handleShortCheck}
                    movieButtonClassName={movieButtonClassName}
                    buttonText="Найти"
                    buttonTextProgress="Ищем.."
                    handleMoreClick={handleMoreClick}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <SavedMovies
                    onMovieLike={handleAddSavedMovie}
                    onMovieDelete={handleDeleteSavedMovie}
                    views={views}
                    movies={movies}
                    savedMovies={savedMovies}
                    isShortCheckActive={isShortCheckActive}
                    handleShortCheck={handleShortCheck}
                    movieButtonClassName={savedMovieButtonClassName}
                    buttonText="Найти"
                    buttonTextProgress="Ищем.."
                    handleMoreClick={handleMoreClick}
                  />
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </CurrentUserContext.Provider>
      </LoggedInContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
