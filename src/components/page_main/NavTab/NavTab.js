import React from 'react';

function NavTab() {
  return (
    <section className="nav-tab section">
      <nav className="nav-tab__items">
        <a href="/" className="link text nav-tab__item">
          О проекте
        </a>
        <a href="/" className="link text nav-tab__item">
          Технологии
        </a>
        <a href="/" className="link text nav-tab__item">
          Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
