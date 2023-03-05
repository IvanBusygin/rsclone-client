import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './FriendCard.scss';
import { useTypedSelector } from '../../../redux/hooks';
import { IDataMyFriends } from '../../../types/friends';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';
import ButtonAddToFriend from '../ButtonAddToFriend/ButtonAddToFriend';

interface IProps {
  friendId: string;
  data: IDataMyFriends;
}

const FriendCardMy = (props: IProps) => {
  const {
    data: { info },
    friendId,
  } = props;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <div className={classNames(style.friendCard, themeClass)}>
      <Link
        to={`/friend/${friendId}`}
        target="_self"
        className={style.friendCard__container}
      >
        <div className={style.friendCard__avatar}>
          <img
            className={style.friendCard__avatar}
            src={info.avatar || userDefaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className={style.friendCard__info}>
          <p className={style.friendCard__name}>{info.fullName}</p>
        </div>
      </Link>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div onClick={(e) => e.stopPropagation()}>
        <ButtonAddToFriend
          id={friendId}
          friendStatus={0}
        />
      </div>
    </div>
  );
};

export default FriendCardMy;
