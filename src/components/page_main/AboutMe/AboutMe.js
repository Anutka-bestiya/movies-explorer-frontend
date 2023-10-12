import React from 'react';
import avatar from '../../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me section" id="about-me">
      <h2 className="section-title about-me__title">Студент</h2>
      <div className="about-me__section">
        <div>
          <h3 className="title about-me__subtitle">Анна</h3>
          <p className="text about-me__text">Фронтенд-разработчик, 34&nbsp;года</p>
          <p className="text about-me__text">
            Я&nbsp;родилась и&nbsp;живу в&nbsp;Екатеринбурге, закончила факультет экономики РАНХИГС
            и&nbsp;менеджмента и международных экономических отношений УрГЭУ. Я&nbsp;люблю
            заниматься декоративно-приклыдным творчеством: создание композиций из&nbsp;витражного
            стекла, цветов из холодной глины, пробовать рисовать в&nbsp;разных техниках.
            Я&nbsp;люблю путешествовать :) Недавно начала кодить на&nbsp;новом уровне с
            Яндекс.Практикум. У&nbsp;меня есть небольшой онлайн ресурс на&nbsp;сопровождении уже
            более 5&nbsp;лет. С&nbsp;2015 года работаю в&nbsp;компаниях в&nbsp;сфере бухгалтерии,
            управленческого и&nbsp;экономического учета и&nbsp;анализа. Примеряю на&nbsp;себе роль
            фронтенд-разрабочика.
          </p>
          <a
            className="link about-me__link"
            href="https://github.com/Anutka-bestiya"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} alt="Фото студента" className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;
