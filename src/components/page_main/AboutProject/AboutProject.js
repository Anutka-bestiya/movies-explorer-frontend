import React from 'react';

function AboutProject() {
  return (
    <section className="about-project section" id="about-project">
      <h2 className="section-title about-project__title">О проекте</h2>
      <div className="about-project__section">
        <div>
          <h3 className="title about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="text about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и&nbsp;финальные доработки.
          </p>
        </div>
        <div>
          <h3 className="title about-project__subtitle">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="text about-project__text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
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
