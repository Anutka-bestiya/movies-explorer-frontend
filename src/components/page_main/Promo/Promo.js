import React from 'react';
import promo_logo from '../../../images/promo-logo.svg';

function Promo() {
  return (
    <section className="promo section">
      <h1 className="title promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img src={promo_logo} alt="Логотип Практикум" className="promo__image " />
    </section>
  );
}

export default Promo;
