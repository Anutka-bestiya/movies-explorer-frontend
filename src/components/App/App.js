import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
// import Login from '../Login/Login';
// import Register from '../Register/Register';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import Profile from '../Profile/Profile';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import NotFound from '../NotFound/NotFound';
// import InfoTooltip from '../InfoTooltip';
// import api from '../utils/api';
// import avatar from '../images/personal-image.jpg';
// import * as auth from '../utils/auth';
// import { LoggedInContext } from '../contexts/LoggedInContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    // <LoggedInContext.Provider value={isLoggedIn}>
    <div className="App page">
      <Header />
      <Routes>
        <Route
          path="*"
          element={!isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />}
        />
        {/* <Route path="/signin" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Register />} /> */}
        <Route path="/" element={<Main />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </div>
    // </LoggedInContext.Provider>
  );
}

export default App;
