import React from 'react';
import Promo from '../page_main/Promo/Promo';
import NavTab from '../page_main/NavTab/NavTab';
import AboutProject from '../page_main/AboutProject/AboutProject';
import Techs from '../page_main/Techs/Techs';
import AboutMe from '../page_main/AboutMe/AboutMe';
import Portfolio from '../page_main/Portfolio/Portfolio';

function Main(
  {
    //   onEditProfile,
    //   onEditAvatar,
    //   onAddPlace,
    //   onCardClick,
    //   onCardLike,
    //   onCardDelete,
    //   cards
  }
) {
  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
