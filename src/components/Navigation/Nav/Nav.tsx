import React from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '../../../redux/hooks';
import style from './Nav.scss';
import myPageIcon from '../../../assets/img/svg/my-page_icon.svg';
import messengerIcon from '../../../assets/img/svg/messenger_icon.svg';
import friendsIcon from '../../../assets/img/svg/friends_icon.svg';
import NavItem from '../NavItem/NavItem';

const Nav = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.navigation_light : style.navigation_dark;

  return (
    <nav className={classNames(style.navigation, themeClass)}>
      <ul className={style.navigation__list}>
        <NavItem
          icon={myPageIcon}
          name="Моя страница"
        />
        <NavItem
          icon={messengerIcon}
          name="Мессенджер"
          count={5}
        />
        <NavItem
          icon={friendsIcon}
          name="Друзья"
          count={1}
        />
      </ul>
    </nav>
  );
};

export default Nav;
