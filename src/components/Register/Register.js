import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import logo from '../../images/logo.png';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import * as auth from '../../utils/auth';
import { useValidate } from '../../utils/use-validate';

function Register(props) {
  const isLoggedIn = React.useContext(LoggedInContext);
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

  React.useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  // Нажатие на кнопку Сохранить, сохраняет данные формы
  function handleSubmit(e) {
    e.preventDefault();
    props.handleSetIsLoading(true);

    const { name, email, password } = formValue;

    auth
      .register(name, email, password)
      .then(newData => {
        console.log(newData);
        props.handleSetIsSucsess(true);
        props.handleSetCurrentUser(newData);
        props.handleSetMessage('Вы успешно зарегистрировались!');
        props.handleLogin(true);
      })
      .catch(err => {
        console.log(`Ошибка регистрации ${err}`);
        props.handleSetIsSucsess(false);
        if (err === 400) {
          console.log(`Ошибка: ${err} - некорректно заполнено одно из полей`);
          props.handleSetMessage('При регистрации пользователя произошла ошибка.');
        } else if (err === 409) {
          console.log(`Ошибка: ${err}`);
          props.handleSetMessage('Пользователь с таким email уже существует.');
        } else {
          console.log(`Ошибка: ${err}`);
          props.handleSetMessage('500 На сервере произошла ошибка.');
        }
      })
      .finally(() => {
        props.handleSetIsLoading(false);
      });
  }

  return isLoggedIn ? (
    <Navigate to='/' replace />
  ) : (
    <main>
      <section className='section register'>
        <a className='link register__logo' href='/'>
          <img src={logo} alt='Логотип: Дипломный проект' className='logo' />
        </a>
        <h1 className='title register__title'>Добро пожаловать!</h1>
        <AuthForm
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
          isValid={isValid}
          onInfoTooltip={props.onInfoTooltip}
          buttonClass={props.buttonClass}
          buttonTextProgress={props.buttonTextProgress}
          buttonText={props.buttonText}
        >
          <div className='register__inputs'>
            <p className='text register__text'>Имя</p>
            <input
              className='text form__input register__input form-register-name'
              required
              id='name'
              name='name'
              type='name'
              minLength='2'
              maxLength='40'
              pattern='^[А-Яа-яЁёa-zA-Z0-9\s\-]+$'
              value={formValue.name || ''}
              onChange={handleChange}
              placeholder='name'
            />
            <span className={`text error register__error ${isValid.name}&& error_visible`}>
              {errorMessage.name}
            </span>
          </div>
          <div className='register__inputs'>
            <p className='text register__text'>E-mail</p>
            <input
              className='text form__input register__input form-register-email'
              required
              id='email'
              name='email'
              type='email'
              minLength='2'
              maxLength='40'
              pattern='[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\.[a-z]{2,}'
              value={formValue.email || ''}
              onChange={handleChange}
              placeholder='email'
            />
            <span className={`text error register__error ${isValid.email}&& error_visible`}>
              {errorMessage.email}
            </span>
          </div>
          <div className='register__inputs'>
            <p className='text register__text'>Пароль</p>
            <input
              className='text form__input register__input form-register-password'
              required
              id='password'
              name='password'
              type='password'
              minLength='8'
              maxLength='40'
              value={formValue.password || ''}
              onChange={handleChange}
              placeholder='password'
            />
            <span className={`text error register__error ${isValid.password}&& error_visible`}>
              {errorMessage.password}
            </span>
          </div>
        </AuthForm>
        {props.children}
        <p className='text register__login-text'>
          Уже зарегистрированы?
          <Link to='/signin' className='link  register__login-link'>
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
