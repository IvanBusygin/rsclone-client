import React from 'react';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import style from './FriendsPage.scss';
import { useTypedSelector } from '../../redux/hooks';

const FriendsPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  const activeElem = ({ isActive }: { isActive: boolean }) => {
    return isActive ? style.friendsPage__buttonActive : style.friendsPage__button;
  };

  return (
    <div className={classNames(style.friendsPage, themeClass)}>
      <header className={style.friendsPage__header}>
        <NavLink
          to="inbox"
          className={activeElem}
        >
          входящие
        </NavLink>
        <NavLink
          to="outbox"
          className={activeElem}
        >
          исходящие
        </NavLink>
        <NavLink
          to="search"
          className={activeElem}
        >
          найти друзей
        </NavLink>
      </header>
      <div className={style.friendsPage__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default FriendsPage;
