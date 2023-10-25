import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <section className="login section">
      <a className="link" href="/">
        <img src={logo} alt="Логотип: Дипломный проект" className="logo login__logo" />
      </a>
      <h1 className="title login__title">Рады видеть!</h1>
      <AuthForm
        // onSubmit={handleSubmit}
        // isLoading={isLoading}
        // errorMessage={errorMessage}
        onInfoTooltip={props.onInfoTooltip}
        buttonTextProgress={props.buttonTextProgress}
        buttonText={props.buttonText}
      >
        <div className="login__inputs">
          <p className="text login__text">E-mail</p>
          <input
            className="text form__input login__input form-login-email"
            required
            id="email"
            name="email"
            type="email"
            //   value={formValue.email}
            //   onChange={handleChange}
            //   placeholder="email"
          />
          <p className="text login__text">Пароль</p>
          <input
            className="text form__input login__input form-login-password"
            required
            id="password"
            name="password"
            type="password"
            //   value={formValue.password}
            //   onChange={handleChange}
            //   placeholder="password"
          />
        </div>
      </AuthForm>
      {props.children}
      <p className="text login__reg-text">
        Ещё не зарегистрированы?
        <Link to="/signup" className="link text login__reg-link">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
