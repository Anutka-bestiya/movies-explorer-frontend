import React from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';

function AuthForm(props) {
  const isLoading = React.useContext(LoadingContext);

  return (
    <form onSubmit={(e) =>{props.onSubmit(e)}} className='form-auth form' noValidate>
      {props.children}
      <button
        type='submit'
        className={`form__button button ${props.buttonClass}`}
        value='Отправить форму сейчас'
        onClick={props.onInfoTooltip}
        disabled={isLoading || !props.isValid}
      >
        {isLoading ? props.buttonTextProgress : props.buttonText}
        <div className='sr-only'>{props.buttonText}</div>
      </button>
    </form>
  );
}

export default AuthForm;
