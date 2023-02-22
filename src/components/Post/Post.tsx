import React, { FC } from 'react';
import classNames from 'classnames';
import style from './Post.scss';
import { IPostProps } from '../../types/myPage';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import getLocaleTimeString from '../../utils/myPage';
import { deleteUserPost } from '../../redux/thunks/myPageThunks';

const Post: FC<IPostProps> = (props) => {
  const { postId, firstName, lastName, avatar, text, time, likes } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.post_light : style.post_dark;

  const { deletingPostId } = useTypedSelector(({ myPage }) => myPage);
  const postClass = deletingPostId === postId ? style.post_remove : null;

  const localeTime = getLocaleTimeString(time);

  const dispatch = useTypedDispatch();

  const onButtonClick = () => {
    dispatch(deleteUserPost(postId));
  };

  return (
    <div className={classNames(style.post, postClass, themeClass)}>
      <header className={style.post__header}>
        <div className={style.post__avatar}>
          <img
            src={avatar}
            alt="Avatar"
          />
        </div>
        <div className={style.post__info}>
          <p className={style.post__author}>{`${firstName} ${lastName}`}</p>
          <time className={style.post__time}>{localeTime}</time>
        </div>
        <button
          className={style.post__button}
          type="button"
          title="Удалить пост"
          onClick={onButtonClick}
        >
          &times;
        </button>
      </header>
      <div className={style.post__text}>{text}</div>
      <div className={style.post__likes}>
        <span className={style.post__likesIcon} />
        <span className={style.post__likesCount}>{likes.length ? likes.length : null}</span>
      </div>
    </div>
  );
};

export default Post;
