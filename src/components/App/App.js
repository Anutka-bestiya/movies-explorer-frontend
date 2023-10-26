import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import api from '../../utils/api';
// import * as auth from '../../utils/auth';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Виталий',
    email: 'Почта пользователя',
    _id: '650cb2d21682f9a4ea25be39'
  });
  const [movies, setMovies] = React.useState([]);
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
  const movieButtonClassName = 'movie__like_active';
  const savedMovieButtonClassName = 'movie-saved__like_active';
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
                  movies={movies}
                  isShortCheckActive={isShortCheckActive}
                  handleShortCheck={handleShortCheck}
                  movieButtonClassName={movieButtonClassName}
                  buttonText="Найти"
                  buttonTextProgress="Ищем.."
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  // onMovieLike={onMovieLike}
                  // onMovieDelete={onMovieDelete}
                  movies={movies}
                  isShortCheckActive={isShortCheckActive}
                  handleShortCheck={handleShortCheck}
                  movieButtonClassName={savedMovieButtonClassName}
                  buttonText="Найти"
                  buttonTextProgress="Ищем.."
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
            {/* <Route
              path="*"
              element={
                !isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />
              }
            /> */}
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
