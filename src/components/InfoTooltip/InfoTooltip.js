import React from 'react';
import check from '../../images/union.svg';
import cross from '../../images/cross.svg';

const InfoTooltip = props => {
  return props.message ? (
    <section className={`infotooltip ${props.isOpen ? 'infotooltip_opened' : ''}`}>
      <div className='infotooltip__container infotooltip__inactiv-close'>
        <button
          className='button button-close'
          onClick={() => props.onClose(props.nav)}
          type='button'
        >
          <div className='sr-only'>Закрыть</div>
        </button>
        {props.isSucsess ? (
          <img className='infotooltip__image' src={check} alt='Галочка в круге' />
        ) : (
          <img className='infotooltip__image' src={cross} alt='Крестик в круге' />
        )}
        <h2 className='title infotooltip__title'>{props.message}</h2>
      </div>
    </section>
  ) : (
    ''
  );
};

export default InfoTooltip;
