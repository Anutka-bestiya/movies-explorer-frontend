import React from 'react';

function Footer() {
  return (
    <footer className="footer section">
      <h2 className="section-title footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__columns">
        <p className="text footer__copyright">© {new Date().getFullYear()} Anutka_bestiya</p>
        <div className="footer__social-icon">
          <a
            href="https://practicum.yandex.ru/"
            className="link text footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            className="link text footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
