import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './FriendIcon.scss';
import { IFriendProps } from '../../types/myPage';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';

const FriendIcon: FC<IFriendProps> = (props) => {
  const { image, name, friendId } = props;

  return (
    <Link
      to={`/friend/${friendId}`}
      target="_blank"
      className={style.friend}
    >
      <img
        className={style.friend__avatar}
        src={image || userDefaultAvatar}
        alt="avatar"
      />
      <span className={style.friend__name}>{name.split(' ')[0]}</span>
    </Link>
  );
};

export default FriendIcon;
