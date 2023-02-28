import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './FriendCardFound.scss';
import { useTypedSelector } from '../../../redux/hooks';
import { IDataMyFriends } from '../../../types/friends';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';

interface IProps {
  friendId: string;
  data: IDataMyFriends;
}

const FriendCardFound = (props: IProps) => {
  const {
    data: { info },
    friendId,
  } = props;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <Link
      to={`/friend/${friendId}`}
      target="_blank"
      className={classNames(style.friendCard, themeClass)}
    >
      <div className={style.friendCard__container}>
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
      </div>
    </Link>
  );
};

export default FriendCardFound;
