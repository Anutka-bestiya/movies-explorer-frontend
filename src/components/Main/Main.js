import React from 'react';
import Promo from '../page_main/Promo/Promo';
import NavTab from '../page_main/NavTab/NavTab';
import AboutProject from '../page_main/AboutProject/AboutProject';
import Techs from '../page_main/Techs/Techs';

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
      {/* <Promo /> */}
      <NavTab />
      <AboutProject />
      <Techs />
    </main>
  );
}

export default Main;
