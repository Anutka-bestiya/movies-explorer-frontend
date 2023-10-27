import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  return (
    (location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies') && (
      <footer className="footer section">
        <h2 className="section-title footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__columns">
          <p className="text footer__copyright">© {new Date().getFullYear()} Anutka_bestiya</p>
          <ul className="footer__social-icons">
            <li className="footer__social-icon">
              <a
                href="https://practicum.yandex.ru/"
                className="link text footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__social-icon">
              <a
                href="https://github.com/"
                className="link text footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  );
}
export default Footer;
