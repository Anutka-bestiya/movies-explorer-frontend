import React from 'react';
import { Routes, Route /* Navigate, useNavigate, useLocation */ } from 'react-router-dom';
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
// import api from '../../utils/api';
// import * as auth from '../../utils/auth';
import { useResize } from '../../utils/use-resize';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  // Используем хук определяющий масштаб экрана
  const { isScreenSm, isScreenLg } = useResize();

  // Количество отображаемых, добавляемых элементов:
  const [views, setViews] = React.useState(12);

  const defaultViews = 12;
  const defaultViewsLg = 8;
  const defaultViewsSm = 5;

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

  const handleShortCheck = () => {
    if (isShortCheckActive === false) setIsShortCheckActive(true);
    else {
      setIsShortCheckActive(false);
    }
  };

  function closeAllTooltip() {
    setIsMenuBurgerOpen(false);
  }

  // const navigate = useNavigate();
  // const location = useLocation();
  const movieButtonClassName = 'movie__like_liked';
  const savedMovieButtonClassName = 'movie__like_saved';
  const registerButtonClassName = '';
  const loginButtonClassName = '';

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App page">
          <Header setIsMenuBurgerOpen={setIsMenuBurgerOpen}>
            <Navigation isOpen={isMenuBurgerOpen} onClose={closeAllTooltip} />
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
                  // onInfoTooltip={setIsInfoTooltipOpen}
                  // handleSetMessage={handleSetMessage}
                  // handleSetIsSucsess={handleSetIsSucsess}
                  // handleSetIsLoading={handleSetIsLoading}
                  // handleLogin={handleLogin}
                >
                  <InfoTooltip
                    // isOpen={isInfoTooltipOpen}
                    // onClose={handleCloseInfoTooltip}
                    // isSucsess={isSucsess}
                    // message={message}
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
                  // onInfoTooltip={setIsInfoTooltipOpen}
                  // handleSetMessage={handleSetMessage}
                  // handleSetIsSucsess={handleSetIsSucsess}
                  // handleSetIsLoading={handleSetIsLoading}
                >
                  <InfoTooltip
                    // isOpen={isInfoTooltipOpen}
                    // onClose={handleCloseInfoTooltip}
                    // isSucsess={isSucsess}
                    // message={message}
                    nav="/signin"
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
                  // onInfoTooltip={setIsInfoTooltipOpen}
                  // handleSetMessage={handleSetMessage}
                  // handleSetIsSucsess={handleSetIsSucsess}
                  // handleSetIsLoading={handleSetIsLoading}
                >
                  <InfoTooltip
                  // isOpen={isInfoTooltipOpen}
                  // onClose={handleCloseInfoTooltip}
                  // isSucsess={isSucsess}
                  // message={message}
                  // nav="/profile"
                  />
                </Profile>
              }
            />
            <Route
              path="/movies"
              element={
                <Movies
                  // onMovieLike={onMovieLike}
                  // onMovieDelete={onMovieDelete}
                  views={views}
                  movies={movies}
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
                  // onMovieLike={onMovieLike}
                  // onMovieDelete={onMovieDelete}
                  views={views}
                  movies={savedMovies}
                  isShortCheckActive={isShortCheckActive}
                  handleShortCheck={handleShortCheck}
                  movieButtonClassName={savedMovieButtonClassName}
                  buttonText="Найти"
                  buttonTextProgress="Ищем.."
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
