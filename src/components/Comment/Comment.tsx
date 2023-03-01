import React, { FC } from 'react';
import classNames from 'classnames';
import style from './Comment.scss';
import getLocaleTimeString from '../../utils/myPage';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';
import { ICommentProps } from '../../types/comment';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { deleteComment } from '../../redux/thunks/friendPageThunk';
import Preloader from '../Preloader/Preloader';
import { setDeletingCommentId } from '../../redux/slices/friendPageSlice';

const Comment: FC<ICommentProps> = (props) => {
  const { id, postId, avatar, date, fullName, text, canDelete } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const { isCommentDeleting, deletingCommentId } = useTypedSelector(({ friendPage }) => friendPage);
  const themeClass = isLightTheme ? style.comment_light : style.comment_dark;

  const dispatch = useTypedDispatch();

  const onDeleteComment = () => {
    dispatch(setDeletingCommentId({ commentId: id }));
    dispatch(deleteComment({ commentId: id, postId }));
  };

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
        {canDelete && (
          <div className={style.comment__deleteWrapper}>
            {isCommentDeleting && deletingCommentId === id ? (
              <Preloader />
            ) : (
              <button
                className={style.comment__deleteButton}
                type="button"
                title="Удалить комментарий"
                disabled={isCommentDeleting}
                onClick={onDeleteComment}
              >
                &times;
              </button>
            )}
          </div>
        )}
      </header>
      <div className={style.comment__text}>{text}</div>
    </div>
  );
};

export default Comment;
