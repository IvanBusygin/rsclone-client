import React, { FC } from 'react';
import classNames from 'classnames';
import style from './Post.scss';
import { IPostProps } from '../../types/myPage';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { removePost } from '../../redux/slices/myPageSlice';

const Post: FC<IPostProps> = (props) => {
  const { post, time } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.post_light : style.post_dark;

  const dispatch = useTypedDispatch();

  const onButtonClick = () => {
    dispatch(removePost({ post }));
  };

  return (
    <div className={classNames(style.post, themeClass)}>
      <header className={style.post__header}>
        <div className={style.post__avatar}>
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
          />
        </div>
        <div className={style.post__info}>
          <p className={style.post__author}>Петя Камушкин</p>
          <time className={style.post__time}>{time}</time>
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
      <div className={style.post__text}>{post}</div>
      <div className={style.post__likes}>
        <span className={style.post__likesIcon} />
        <span className={style.post__likesCount}>10</span>
      </div>
    </div>
  );
};

export default Post;
