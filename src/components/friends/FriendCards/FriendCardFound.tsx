import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './FriendCard.scss';
import { useTypedSelector } from '../../../redux/hooks';
import { IFoundPeople } from '../../../types/friends';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';
import ButtonAddToFriend from '../ButtonAddToFriend/ButtonAddToFriend';

const FriendCardFound = (props: IFoundPeople) => {
  const { user, friendStatus } = props;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <div className={classNames(style.friendCard, themeClass)}>
      <Link
        to={`/user/${user._id}`}
        target="_blank"
        className={style.friendCard__container}
      >
        <div className={style.friendCard__avatar}>
          <img
            className={style.friendCard__avatar}
            src={user.info.avatar || userDefaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className={style.friendCard__info}>
          <p className={style.friendCard__name}>{user.info.fullName}</p>
        </div>
      </Link>
      <ButtonAddToFriend
        id={user._id}
        friendStatus={friendStatus}
      />
    </div>
  );
};

export default FriendCardFound;
