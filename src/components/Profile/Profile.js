import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AuthForm from '../AuthForm/AuthForm';
import * as auth from '../../utils/auth';
import * as mainApi from '../../utils/mainApi';
import { useValidate } from '../../utils/use-validate';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const buttonProfileEdit = document.querySelector('.profile__edit-button');
  const buttonSubmitEdit = document.querySelector('.profile__save-button');
  const inputProfileName = document.querySelector('.form-profile-name');
  const inputProfileEmail = document.querySelector('.form-profile-email');

  // Проверка токена
  React.useEffect(() => {
    props.tokenCheck(); // проверка токена
  }, []);

  // Блокировка кнопки сохранения данных профиля
  React.useEffect(() => {
    if (isValid && buttonSubmitEdit !== null)
      formValue.name !== currentUser.name || formValue.email !== currentUser.email
        ? buttonSubmitEdit.removeAttribute('disabled')
        : buttonSubmitEdit.setAttribute('disabled', true);
  }, [formValue]);

  // Нажатие на кнопку Редактировать, активирует поля формы
  function handleEdit() {
    buttonProfileEdit.classList.add('profile__button_not-visible');
    buttonSubmitEdit.classList.remove('profile__button_not-visible');
    buttonSubmitEdit.setAttribute('disabled', true);
    inputProfileName.removeAttribute('disabled');
    inputProfileEmail.removeAttribute('disabled');
  }

  // Нажатие на кнопку Сохранить, сохраняет данные формы
  function handleSubmit(e) {
    e.preventDefault();
    props.handleSetIsLoading(true);

    const { name, email } = formValue;

    mainApi
      .setUserInfo({ name, email })
      .then(newData => {
        console.log(newData);
        props.handleSetIsSucsess(true);
        props.handleSetCurrentUser(newData);
        props.handleSetMessage('Вы успешно обновили данные профиля');
      })
      .catch(err => {
        console.log(`Ошибка отправки данных на сервер: ${err}`);
        props.handleSetIsSucsess(false);
        if (err === 400) {
          console.log(`Ошибка: ${err} - некорректно заполнено одно из полей`);
          return props.handleSetMessage('При обновлении профиля произошла ошибка.');
        } else if (err === 409) {
          console.log(`Ошибка: ${err}`);
          return props.handleSetMessage('Пользователь с таким email уже существует.');
        } else {
          console.log(`Ошибка: ${err}`);
          return props.handleSetMessage('500 На сервере произошла ошибка.');
        }
      })
      .finally(() => {
        props.handleSetIsLoading(false);
        buttonProfileEdit.classList.remove('profile__button_not-visible');
        buttonSubmitEdit.classList.add('profile__button_not-visible');
        inputProfileName.setAttribute('disabled', true);
        inputProfileEmail.setAttribute('disabled', true);
      });
  }

  // Нажатие на кнопку Выйти
  function signOut() {
    props.handleSetIsLoading(true);
    auth
      .logout()
      .then(() => {
        localStorage.clear();
        props.handleLogin(false);
        props.handleSetCurrentUser('');
        navigate('/', { replace: true });
      })
      .catch(err => console.log(`Ошибка выхода: ${err}`))
      .finally(props.handleSetIsLoading(false));
  }

  return (
    <main>
      <section className='sectoin profile'>
        <h1 className='title profile__title'>Привет, {currentUser.name}!</h1>
        <AuthForm
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
          isValid={isValid}
          onInfoTooltip={props.onInfoTooltip}
          buttonTextProgress={props.buttonTextProgress}
          buttonText={props.buttonText}
          buttonClass={'profile__button_not-visible profile__save-button'}
        >
          <div className='profile__data'>
            <p className='text profile__text'>Имя</p>
            <input
              className='text form__input profile__input form-profile-name'
              required
              disabled
              id='name'
              name='name'
              type='name'
              minLength='2'
              maxLength='40'
              pattern='^[А-Яа-яЁёa-zA-Z\s]+$'
              value={formValue.name || ''}
              onChange={handleChange}
              placeholder='Имя'
            />

            <span className={`text error profile__error ${isValid.name}&& error_visible`}>
              {errorMessage.name}
            </span>
          </div>
          <div className='profile__data'>
            <p className='text profile__text'>E-mail</p>
            <input
              className='text form__input profile__input form-profile-email'
              required
              disabled
              id='email'
              name='email'
              type='email'
              minLength='2'
              maxLength='40'
              value={formValue.email || ''}
              onChange={handleChange}
              placeholder='Email'
            />{' '}
            <span className={`text error profile__error ${isValid.email}&& error_visible`}>
              {errorMessage.email}
            </span>
          </div>
          {props.children}
        </AuthForm>
        <div className='button text profile__edit-button' onClick={handleEdit}>
          Редактировать
        </div>
        <Link to='/' className='link text profile__link profile__link_theme_red' onClick={signOut}>
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  );
}

export default Profile;
