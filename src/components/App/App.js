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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import {
  defaultViews,
  defaultViewsLg,
  defaultViewsSm,
  defaultViewsGap,
  defaultViewsLgGap,
  defaultViewsSmGap,
  BASE_MOVIE_URL
} from '../../utils/config';
import { useResize } from '../../utils/use-resize';
import { LoadingContext } from '../../contexts/LoadingContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

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
    setTimeout(() => {
      determiningScale();
    });
  }, [isScreenSm, isScreenLg]);

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

  // Стейты
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
    _id: ''
  });
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isMenuBurgerOpen, setIsMenuBurgerOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSucsess, setIsSucsess] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Получение информации о пользователе
  React.useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserInfo()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(err => {
          console.log(`Ошибка получения currentUser: ${err}`);
        });
  }, [isLoggedIn]);

  // Получение фильмов при авторизации пользователя
  React.useEffect(() => {
    setIsLoading(true);
    const movies = JSON.parse(localStorage.getItem('allMovies'));
    if (isLoggedIn && movies === null) {
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
        })
        .catch(err => {
          console.log(`Ошибка получения массива movies: ${err}`);
        });
    } else {
      setMovies(movies);
    }

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (isLoggedIn && savedMovies === null) {
      mainApi
        .getSavedMovie()
        .then(savedMoviesForLS => {
          setSavedMovies(savedMoviesForLS);
          localStorage.setItem('savedMovies', JSON.stringify(savedMoviesForLS));
        })
        .catch(err => {
          console.log(`Ошибка получения массива saved movies: ${err}`);
        });
    } else {
      setSavedMovies(savedMovies);
    }
    // localStorage.clear();
    setIsLoading(false);
  }, [isLoggedIn]);

  // Функция проверки токена
  const tokenCheck = () => {
    auth
      .checkToken()
      .then(res => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        navigate(location.pathname);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setIsLoggedIn(false);
        setCurrentUser({});
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
        console.log(movie);
        const movieForLS = movie;
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

  // вход в приложение
  const handleLogin = boolean => {
    setIsLoggedIn(boolean);
    setIsSucsess(boolean);
  };

  // Сохранение данных пользователя
  function handleSetCurrentUser({ name, email }) {
    setCurrentUser({ name, email });
  }

  // успех!
  function handleSetIsSucsess(boolean) {
    setIsSucsess(boolean);
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

  return (
    <LoadingContext.Provider value={isLoading}>
      <LoggedInContext.Provider value={isLoggedIn}>
        <CurrentUserContext.Provider value={currentUser}>
          {isLoading ? (
            <Preloader />
          ) : (
            <div className='App page'>
              <Header setIsMenuBurgerOpen={setIsMenuBurgerOpen}>
                <Navigation isOpen={isMenuBurgerOpen} onClose={closeMenuBurger} />
              </Header>
              <Routes>
                <Route
                  path='/signin'
                  element={
                    <Login
                      name='login'
                      title='Вход'
                      buttonText='Войти'
                      buttonTextProgress='Авторизация..'
                      buttonClass=''
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
                        nav='/movies'
                      />
                    </Login>
                  }
                />
                <Route
                  path='/signup'
                  element={
                    <Register
                      name='register'
                      title='Регистрация'
                      buttonText='Зарегистрироваться'
                      buttonTextProgress='Регистрация..'
                      buttonClass=''
                      onInfoTooltip={setIsInfoTooltipOpen}
                      handleSetMessage={handleSetMessage}
                      handleSetCurrentUser={handleSetCurrentUser}
                      handleSetIsSucsess={handleSetIsSucsess}
                      handleSetIsLoading={handleSetIsLoading}
                      handleLogin={handleLogin}
                    >
                      <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        onClose={handleCloseInfoTooltip}
                        isSucsess={isSucsess}
                        message={message}
                        nav='/movies'
                      />
                    </Register>
                  }
                />
                <Route path='/' element={<Main />} />
                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute
                      element={
                        <Profile
                          tokenCheck={tokenCheck}
                          name='profile'
                          title='Обновление данных'
                          buttonText='Сохранить'
                          buttonTextProgress='Сохранение..'
                          handleSetCurrentUser={handleSetCurrentUser}
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
                            nav='/profile'
                          />
                        </Profile>
                      }
                    />
                  }
                />
                <Route
                  path='/movies'
                  element={
                    <ProtectedRoute
                      element={
                        <Movies
                          tokenCheck={tokenCheck}
                          onMovieLike={handleAddSavedMovie}
                          onMovieDelete={handleDeleteSavedMovie}
                          views={views}
                          movies={movies}
                          savedMovies={savedMovies}
                          movieButtonClassName='movie__like_liked'
                          buttonText='Найти'
                          buttonTextProgress='Ищем..'
                          handleMoreClick={handleMoreClick}
                          handleSetIsLoading={handleSetIsLoading}
                        />
                      }
                    />
                  }
                />
                <Route
                  path='/saved-movies'
                  element={
                    <ProtectedRoute
                      element={
                        <SavedMovies
                          tokenCheck={tokenCheck}
                          onMovieLike={handleAddSavedMovie}
                          onMovieDelete={handleDeleteSavedMovie}
                          views={views}
                          movies={movies}
                          savedMovies={savedMovies}
                          movieButtonClassName='movie__like_saved'
                          buttonText='Найти'
                          buttonTextProgress='Ищем..'
                          handleMoreClick={handleMoreClick}
                          handleSetIsLoading={handleSetIsLoading}
                        />
                      }
                    />
                  }
                />
                <Route path='/*' element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          )}
        </CurrentUserContext.Provider>
      </LoggedInContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
