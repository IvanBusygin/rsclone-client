import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './FriendCardFound.scss';
import { useTypedSelector } from '../../../redux/hooks';
import { IOutComming } from '../../../types/friends';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';

interface IProps {
  data: IOutComming;
}

const FriendCardFound = ({ data }: IProps) => {
  const { recipient } = data;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <Link
      to={`/user/${recipient._id}`}
      target="_blank"
      className={classNames(style.friendCard, themeClass)}
    >
      <div className={style.friendCard__container}>
        <div className={style.friendCard__avatar}>
          <img
            className={style.friendCard__avatar}
            src={recipient.info.avatar || userDefaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className={style.friendCard__info}>
          <p className={style.friendCard__name}>{recipient.info.fullName}</p>
        </div>
      </div>
    </Link>
  );
};

export default FriendCardFound;
