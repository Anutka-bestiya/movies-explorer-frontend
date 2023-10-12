import React from 'react';
import icon_arrow from '../../../images/icon_arrow.png';

function Portfolio() {
  return (
    <section className="portfolio section">
      <h2 className="section-title portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a
            href="https://anutka-bestiya.github.io/how-to-learn/"
            className="link portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text portfolio__text">Статичный сайт</p>
            <img src={icon_arrow} alt="Стрелка ссылки" className="portfolio__icon" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://anutka-bestiya.github.io/russian-travel/"
            className="link portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text portfolio__text">Адаптивный сайт</p>
            <img src={icon_arrow} alt="Стрелка ссылки" className="portfolio__icon" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://mesto-anchikfyz.nomoredomainsicu.ru/"
            className="link portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text portfolio__text">Одностраничное приложение</p>
            <img src={icon_arrow} alt="Стрелка ссылки" className="portfolio__icon" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
