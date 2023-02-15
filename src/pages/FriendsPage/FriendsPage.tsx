import React from 'react';
import classNames from 'classnames';
import { Link, Outlet } from 'react-router-dom';
import style from './FriendsPage.scss';
import { useTypedSelector } from '../../redux/hooks';

const FriendsPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <div className={classNames(style.friendsPage, themeClass)}>
      <header className={style.friendsPage__header}>
        <Link
          to="inbox"
          className={style.friendsPage__button}
        >
          входящие
        </Link>
        <Link
          to="outbox"
          className={style.friendsPage__button}
        >
          исходящие
        </Link>
        <Link
          to="search"
          className={style.friendsPage__button}
        >
          найти друзей
        </Link>
      </header>
      <div className={style.friendsPage__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default FriendsPage;
