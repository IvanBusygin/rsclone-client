import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './FriendCardFound.scss';
import { useTypedSelector } from '../../../redux/hooks';
import { IFoundPeople } from '../../../types/friends';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';
import ButtonAddToFriend from '../ButtonAddToFriend/ButtonAddToFriend';
import sent from '../../../assets/img/svg/sent.svg';

const FriendCardFound = (props: IFoundPeople) => {
  const { user, friendStatus } = props;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <Link
      to={`/user/${user._id}`}
      target="_blank"
      className={classNames(style.friendCard, themeClass)}
    >
      <div className={style.friendCard__container}>
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
      </div>
      {friendStatus !== 1 ? (
        <ButtonAddToFriend id={user._id} />
      ) : (
        <img
          className={style.sent}
          src={sent}
          alt="sent"
        />
      )}
    </Link>
  );
};

export default FriendCardFound;
