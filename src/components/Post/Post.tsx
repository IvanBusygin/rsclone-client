import React, { FC } from 'react';
import classNames from 'classnames';
import style from './Post.scss';
import { IPostProps } from '../../types/myPage';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import getLocaleTimeString from '../../utils/myPage';
import { deleteUserPost, editUserPost } from '../../redux/thunks/myPageThunks';
import TextField from '../TextField/TextField';
import { editPost } from '../../redux/slices/myPageSlice';

const Post: FC<IPostProps> = (props) => {
  const { postId, firstName, lastName, avatar, text, time, likes, editTime } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.post_light : style.post_dark;

  const { deletingPostId, editingPostId } = useTypedSelector(({ myPage }) => myPage);
  const postClass = deletingPostId === postId ? style.post_remove : null;

  const localeTime = getLocaleTimeString(time);

  const dispatch = useTypedDispatch();

  const onDeleteButtonClick = () => {
    dispatch(deleteUserPost(postId));
  };

  const onEditButtonClick = () => {
    dispatch(editPost({ postId }));
  };

  const onSendEditedPostClick = (newPostText: string) => {
    dispatch(editUserPost({ postId, newPostText }));
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
          <div className={style.post__time}>
            <time className={style.post__creationTime}>{localeTime}</time>
            {editTime && (
              <span
                className={style.post__editingTime}
                title={getLocaleTimeString(editTime)}
              >
                {' '}
                (ред.)
              </span>
            )}
          </div>
        </div>
        <button
          className={style.post__deletePostButton}
          type="button"
          title="Удалить пост"
          onClick={onDeleteButtonClick}
        >
          &times;
        </button>
      </header>
      {editingPostId === postId ? (
        <TextField
          text={text}
          onButtonClick={onSendEditedPostClick}
        />
      ) : (
        <div className={style.post__textWrapper}>
          <div className={style.post__text}>{text}</div>
          <button
            className={style.post__editPostButton}
            type="button"
            title="Редактировать пост"
            aria-label="Edit post"
            onClick={onEditButtonClick}
          />
        </div>
      )}
      <div className={style.post__likes}>
        <span className={style.post__likesIcon} />
        <span className={style.post__likesCount}>{likes.length ? likes.length : null}</span>
      </div>
    </div>
  );
};

export default Post;
