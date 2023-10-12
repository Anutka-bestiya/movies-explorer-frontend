import React from 'react';

function Techs() {
  return (
    <section className="techs section" id="techs">
      <h2 className="section-title techs__title">Технологии</h2>
      <h3 className="title techs__subtitle">7 технологий</h3>
      <p className="text techs__text">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном
        проекте.
      </p>
      <ul className="techs__items">
        <li className="text techs__item">HTML</li>
        <li className="text techs__item">CSS</li>
        <li className="text techs__item">JS</li>
        <li className="text techs__item">React</li>
        <li className="text techs__item">Git</li>
        <li className="text techs__item">Express.js</li>
        <li className="text techs__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
