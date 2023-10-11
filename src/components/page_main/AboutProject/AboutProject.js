import React from 'react';

function AboutProject() {
  return (
    <section className="about-project section">
      <h2 className="section-title about-project__title">О проекте</h2>
      <div className="about-project__section">
        <div>
          <h3 className="title about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="text about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div>
          <h3 className="title about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="text about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__items">
        <p className="text about-project__item">1 неделя</p>
        <p className="text about-project__item about-project__item-vide">4 недели</p>
        <p className="text about-project__item ">Back-end</p>
        <p className="text about-project__item about-project__item-vide">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
