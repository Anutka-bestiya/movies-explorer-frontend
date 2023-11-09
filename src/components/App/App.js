import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
// import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
// import {
//   defaultViews,
//   defaultViewsLg,
//   defaultViewsSm,
//   defaultViewsGap,
//   defaultViewsLgGap,
//   defaultViewsSmGap
//   // BASE_MOVIE_URL
// } from '../../utils/config';
// import { useResize } from '../../utils/use-resize';
import { LoadingContext } from '../../contexts/LoadingContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

function App() {
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
  const [filtredSavedMovies, setFiltredSavedMovies] = React.useState([]);
  const [isMenuBurgerOpen, setIsMenuBurgerOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSucsess, setIsSucsess] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // // Используем хук определяющий масштаб экрана
  // const { isScreenSm, isScreenLg } = useResize();

  // // Количество отображаемых, добавляемых элементов:
  // const [views, setViews] = React.useState(defaultViews);

  // const determiningScale = () => {
  //   if (!isScreenSm) {
  //     setViews(defaultViewsSm);
  //   } else {
  //     if (!isScreenLg) {
  //       setViews(defaultViewsLg);
  //     } else {
  //       setViews(defaultViews);
  //     }
  //   }
  // };

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     determiningScale();
  //   });
  // }, [
  //   isScreenSm,
  //   isScreenLg,
  //   // filtredMovies,
  //   filtredSavedMovies
  // ]);

  // // Клик по кнопке "Еще"
  // const handleMoreClick = () => {
  //   if (!isScreenSm) {
  //     if (views === defaultViewsSm) {
  //       setViews(defaultViewsSm + defaultViewsSmGap);
  //     } else {
  //       setViews(views + defaultViewsSmGap);
  //     }
  //   } else {
  //     if (!isScreenLg) {
  //       if (views === defaultViewsLg) {
  //         setViews(defaultViewsLg + defaultViewsLgGap);
  //       } else {
  //         setViews(views + defaultViewsLgGap);
  //       }
  //     } else {
  //       if (views === defaultViews) {
  //         setViews(defaultViews + defaultViewsGap);
  //       } else {
  //         setViews(views + defaultViewsGap);
  //       }
  //     }
  //   }
  // };

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
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    mainApi
      .getSavedMovie()
      .then(savedMovies => {
        setSavedMovies(savedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        console.log('Фильмы пользователя получены и загружены в локалстораж');
      })
      .catch(err => {
        console.log(`Ошибка получения массива saved movies: ${err}`);
      })
      .finally(() => {});
  }, []);

  // Сохранение массива фильмов
  const handleSetMovies = movies => {
    setMovies(movies);
  };

  // Сохранение фильмов пользователя
  const handleSetSavedMovies = movies => {
    setSavedMovies(movies);
  };

  const handleSetFiltredSavedMovies = movie => {
    setFiltredSavedMovies(movie);
  };

  // Добавление сохраненного фильма
  const handleAddSavedMovie = newMovie => {
    mainApi
      .addSavedMovie(newMovie)
      .then(movie => {
        const movieForLS = movie;
        setSavedMovies([movieForLS, ...savedMovies]);
        return localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch(err => console.log(`Ошибка сохранения фильма: ${err}`));
  };

  // Удаление сохраненного фильма
  const handleDeleteSavedMovie = movie => {
    // id = movie.movieId
    location.pathname !== '/saved-movies' &&
      (movie = savedMovies.find(m => {
        if (m.movieId === movie.movieId);
        return m;
      }));
    // id = movie._id
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(m => {
          if (m._id !== movie._id) {
            return m;
          }
        });
        setSavedMovies(newSavedMovies);

        const newFiltredSavedMovies = filtredSavedMovies.filter(m => {
          if (m._id !== movie._id) {
            return m;
          }
        });
        setFiltredSavedMovies(newFiltredSavedMovies);
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
                          movies={movies}
                          savedMovies={savedMovies}
                          handleSetMovies={handleSetMovies}
                          handleSetSavedMovies={handleSetSavedMovies}
                          movieButtonClassName='movie__like_liked'
                          buttonText='Найти'
                          buttonTextProgress='Ищем..'
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
                          movies={movies}
                          savedMovies={savedMovies}
                          filtredSavedMovies={filtredSavedMovies}
                          handleSetMovies={handleSetMovies}
                          handleSetSavedMovies={handleSetSavedMovies}
                          handleSetFiltredSavedMovies={handleSetFiltredSavedMovies}
                          movieButtonClassName='movie__like_saved'
                          buttonText='Найти'
                          buttonTextProgress='Ищем..'
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
