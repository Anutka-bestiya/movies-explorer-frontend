import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import * as auth from '../../utils/auth';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useValidate } from '../../utils/use-validate';

function Login(props) {
  const navigate = useNavigate();
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

  React.useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSetIsLoading(true);

    auth
      .authorize(formValue.email, formValue.password)
      .then(data => {
        if (data) {
          props.handleSetIsSucsess(true);
          navigate('/movies', { replace: true });
          props.handleLogin(true);
        } else {
          props.onInfoTooltip(true);
        }
      })
      .catch(err => {
        console.log(err);
        if (err === 400 || 401) {
          props.handleSetMessage('При авторизации произошла ошибка.');
          if (err === 400) {
            props.handleSetMessage('400 - не передано одно из полей');
          }
          props.handleSetMessage('401 - Вы ввели неправильный логин или пароль.');
          props.onInfoTooltip(true);
          return;
        }
      })
      .finally(() => {
        props.handleSetIsLoading(false);
      });
  }

  return (
    <main>
      <section className='login section'>
        <a className='link login__logo' href='/'>
          <img src={logo} alt='Логотип: Дипломный проект' className='logo ' />
        </a>
        <h1 className='title login__title'>Рады видеть!</h1>
        <AuthForm
          onSubmit={handleSubmit}
          isValid={isValid}
          errorMessage={errorMessage}
          onInfoTooltip={props.onInfoTooltip}
          buttonClass={props.buttonClass}
          buttonTextProgress={props.buttonTextProgress}
          buttonText={props.buttonText}
        >
          <div className='login__inputs'>
            <p className='text login__text'>E-mail</p>
            <input
              className='text form__input login__input form-login-email'
              required
              id='email'
              name='email'
              type='email'
              minLength='2'
              maxLength='40'
              value={formValue.email || ''}
              onChange={handleChange}
              placeholder='Email'
            />
            <span className={`text error login__error ${isValid.email}&& error_visible`}>
              {errorMessage.email}
            </span>
          </div>
          <div className='login__inputs'>
            <p className='text login__text'>Пароль</p>
            <input
              className='text form__input login__input form-login-password'
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
            <span className={`text error login__error ${isValid.password}&& error_visible`}>
              {errorMessage.password}
            </span>
          </div>
        </AuthForm>
        {props.children}
        <p className='text login__reg-text'>
          Ещё не зарегистрированы?
          <Link to='/signup' className='link login__reg-link'>
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
