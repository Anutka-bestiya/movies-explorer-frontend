import React from 'react';

function NavTab() {
  return (
    <section className="nav-tab section" aria-label="Навигация">
      <nav className="nav-tab__items">
        <a href="/#about-project" className="link text nav-tab__item">
          О проекте
        </a>
        <a href="/#techs" className="link text nav-tab__item">
          Технологии
        </a>
        <a href="/#about-me" className="link text nav-tab__item">
          Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
