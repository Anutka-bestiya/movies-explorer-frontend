import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../../contexts/LoadingContext';
import * as auth from '../../utils/auth';

function Register(props) {
  const isLoading = React.useContext(LoadingContext);
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formErrorSpan = document.querySelector('.form__spanerror');
    
    {
      props.handleSetIsLoading(true);
      const { name, email, password } = formValue;
      auth
        .register( name, email, password)
        .then(res => {
          console.log(res);
          props.handleSetMessage('Вы успешно зарегистрировались!');
          props.handleSetIsSucsess(true);
        })
        .catch(err => {
          console.log(`Ошибка регистрации ${err}`);
          if (err === 400) {
            console.log(`Ошибка: ${err} - некорректно заполнено одно из полей`);
            props.handleSetMessage('Что-то пошло не так! Попробуйте ещё раз.');
          }
        })
        .finally(() => {
          props.handleSetIsLoading(false);
          setErrorMessage('');
          formErrorSpan.classList.remove('popup__error_visible');
        });
    }
  }

  return (
    <main>
      <section className="section register">
        <a className="link register__logo" href="/">
          <img src={logo} alt="Логотип: Дипломный проект" className="logo" />
        </a>
        <h1 className="title register__title">Добро пожаловать!</h1>
        <AuthForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onInfoTooltip={props.onInfoTooltip}
          buttonClass={props.buttonClass}
          buttonTextProgress={props.buttonTextProgress}
          buttonText={props.buttonText}
        >
          <div className="register__inputs">
            <p className="text register__text">Имя</p>
            <input
              className="text form__input register__input form-register-name"
              required
              id="name"
              name="name"
              type="name"
                value={formValue.name}
                onChange={handleChange}
              placeholder="name"
            />
            <p className="text register__text">E-mail</p>
            <input
              className="text form__input register__input form-register-email"
              required
              id="email"
              name="email"
              type="email"
                value={formValue.email}
                onChange={handleChange}
              placeholder="email"
            />
            <p className="text register__text">Пароль</p>
            <input
              className="text form__input register__input form-register-password"
              required
              id="password"
              name="password"
              type="password"
                value={formValue.password}
                onChange={handleChange}
              placeholder="password"
            />
          </div>
        </AuthForm>
        {props.children}
        <p className="text register__login-text">
          Уже зарегистрированы?
          <Link to="/signin" className="link  register__login-link">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
