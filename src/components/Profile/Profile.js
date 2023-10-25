import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AuthForm from '../AuthForm/AuthForm';

import * as auth from '../../utils/auth';

function Profile(props) {
  const isLoggedIn = React.useContext(LoggedInContext);
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  //   React.useEffect(() => {
  //     setName(currentUser.name);
  //     setEmail(currentUser.email);
  //   }, [currentUser, isOpen]);

  function signOut() {
    auth
      .logout()
      .then(() => {
        // props.handleLogin(false);
        navigate('/', { replace: true });
      })
      .catch(err => console.log(`Ошибка выхода: ${err}`));
  }

  return (
    <section className="sectoin profile">
      <h1 className="title profile__title">Привет, {currentUser.name}!</h1>
      <AuthForm
        // onSubmit={handleSubmit}
        // isLoading={isLoading}
        // errorMessage={errorMessage}
        onInfoTooltip={props.onInfoTooltip}
        buttonTextProgress={props.buttonTextProgress}
        buttonText={props.buttonText}
        buttonClass={'profile__save-button'}
      >
        <div className="profile__data">
          <p className="text profile__text">Имя</p>
          <input
            className="text form__input profile__input form-profile-name"
            required
            readOnly="true"
            id="name"
            name="name"
            type="name"
            value={currentUser.name}
            //   onChange={handleChange}
            //   placeholder="name"
          />
        </div>
        <div className="profile__data">
          <p className="text profile__text">E-mail</p>
          <input
            className="text form__input profile__input form-profile-email"
            required
            readOnly="true"
            id="email"
            name="email"
            type="email"
            value={currentUser.email}
            //   onChange={handleChange}
            //   placeholder="email"
          />
        </div>
        {props.children}
      </AuthForm>
      <Link
        to="/signout"
        className="link text profile__link profile__link_theme_red"
        onClick={signOut}
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}
export default Profile;
