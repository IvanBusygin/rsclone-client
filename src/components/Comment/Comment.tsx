import React, { FC } from 'react';
import classNames from 'classnames';
import style from './Comment.scss';
import getLocaleTimeString from '../../utils/myPage';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';
import { ICommentProps } from '../../types/comment';
import { useTypedSelector } from '../../redux/hooks';

const Comment: FC<ICommentProps> = (props) => {
  const { avatar, date, fullName, text } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.comment_light : style.comment_dark;

  return (
    <div className={classNames(style.comment, themeClass)}>
      <header className={style.comment__header}>
        <div className={style.comment__avatar}>
          <img
            src={avatar || userDefaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className={style.comment__info}>
          <p className={style.comment__author}>{fullName}</p>
          <div className={style.comment__time}>
            <time className={style.comment__creationTime}>{getLocaleTimeString(date)}</time>
          </div>
        </div>
      </header>
      <div className={style.comment__text}>{text}</div>
    </div>
  );
};

export default Comment;
