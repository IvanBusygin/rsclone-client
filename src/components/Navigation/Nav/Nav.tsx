import React from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '../../../redux/hooks';
import style from './Nav.scss';
import myPageIcon from '../../../assets/img/svg/my-page_icon.svg';
import messengerIcon from '../../../assets/img/svg/messenger_icon.svg';
import friendsIcon from '../../../assets/img/svg/friends_icon.svg';
import NavItem from '../NavItem/NavItem';

const Nav = () => {
  const { isLightTheme, chats } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.navigation_light : style.navigation_dark;

  const { dataInFriends } = useTypedSelector(({ friends }) => friends);

  return (
    <nav className={classNames(style.navigation, themeClass)}>
      <ul className={style.navigation__list}>
        <NavItem
          route="/"
          icon={myPageIcon}
          name="Моя страница"
        />
        <NavItem
          route="/messenger"
          icon={messengerIcon}
          name="Мессенджер"
          count={chats.map((chat) => !chat.chatOwner).length}
        />
        <NavItem
          route="/friends"
          icon={friendsIcon}
          name="Друзья"
          count={dataInFriends.length}
        />
      </ul>
    </nav>
  );
};

export default Nav;
