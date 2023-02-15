import React from 'react';
import classNames from 'classnames';
import style from './FriendCard.scss';
import { useTypedSelector } from '../../redux/hooks';

const FriendCard = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <div className={classNames(style.friendCard, themeClass)}>
      <div className={style.friendCard__avatar}>
        <img
          src="https://via.placeholder.com/70"
          alt="Avatar"
        />
      </div>
      <div className={style.friendCard__info}>
        <p className={style.friendCard__name}>Петя Камушкин</p>
      </div>
    </div>
  );
};

export default FriendCard;
