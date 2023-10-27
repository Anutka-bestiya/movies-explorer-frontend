import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound({ status = 404, message = 'Страница не найдена' }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <section className="section not-found">
        <h1 className="title not-found__title">{status}</h1>
        <p className="text not-found__text">{message}</p>
        <button className="link text not-found__button" onClick={goBack} type="button">
          Назад
        </button>
      </section>
    </main>
  );
}
export default NotFound;
