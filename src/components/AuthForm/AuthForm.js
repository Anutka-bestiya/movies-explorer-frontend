import React from 'react';

function AuthForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="form-auth form" noValidate>
      {props.children}
      <span className="text form__spanerror ">{props.errorMessage}</span>
      <button
        type="submit"
        className={`form__button button ${props.buttonClass}`}
        value="Отправить форму сейчас"
        onClick={props.onInfoTooltip}
      >
        {props.buttonText}
        {/* {props.isLoading ? props.buttonTextProgress : props.buttonText} */}
        <div className="sr-only">{props.buttonText}</div>
      </button>
    </form>
  );
}

export default AuthForm;
