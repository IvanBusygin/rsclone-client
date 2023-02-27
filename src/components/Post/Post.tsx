import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import style from './Post.scss';
import { IPostProps } from '../../types/myPage';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import getLocaleTimeString from '../../utils/myPage';
import { deletePersonPost, editPersonPost } from '../../redux/thunks/myPageThunks';
import { editPost, unEditPost } from '../../redux/slices/myPageSlice';
import editIcon from '../../assets/img/svg/settings_icon.svg';
import saveIcon from '../../assets/img/svg/save-button_icon.svg';
import Preloader from '../Preloader/Preloader';

const Post: FC<IPostProps> = (props) => {
  const { postId, firstName, lastName, avatar, text, time, likes, editTime, canEdit } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.post_light : style.post_dark;

  const { deletingPostId, editingPostId, savingPostId, successfullySavedPostId } = useTypedSelector(
    ({ myPage }) => myPage,
  );
  const postClass = deletingPostId === postId ? style.post_remove : null;

  const [isButtonSave, setIsButtonSave] = useState(false);
  const [postTempText, setPostTempText] = useState('');

  const dispatch = useTypedDispatch();

  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isButtonSave) {
      if (postRef.current) {
        postRef.current.focus();
      }
    } else if (postRef.current) {
      postRef.current.blur();
    }
  }, [isButtonSave]);

  useEffect(() => {
    if (editingPostId !== postId) {
      setIsButtonSave(false);
    }

    if (postTempText && successfullySavedPostId !== postId && postRef.current) {
      postRef.current.innerText = postTempText;
    }

    if (successfullySavedPostId === postId) {
      setPostTempText('');
    }
  }, [editingPostId, postId, postTempText, successfullySavedPostId]);

  const onDeleteButtonClick = () => {
    dispatch(deletePersonPost(postId));
    dispatch(unEditPost());
    setIsButtonSave(false);
  };

  const onButtonClick = () => {
    if (!isButtonSave) {
      dispatch(editPost({ postId }));
      setIsButtonSave(true);

      if (postRef.current) {
        setPostTempText(postRef.current.innerText);
      }
    } else if (editingPostId === postId && postRef.current) {
      dispatch(editPersonPost({ postId, newPostText: postRef.current.innerText }));
      setIsButtonSave(false);
    }
  };

  const onUnEditPost = () => {
    dispatch(unEditPost());
    setIsButtonSave(false);
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
            <time className={style.post__creationTime}>{getLocaleTimeString(time)}</time>
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
        {canEdit && (
          <button
            className={style.post__deletePostButton}
            type="button"
            title="Удалить пост"
            onClick={onDeleteButtonClick}
          >
            &times;
          </button>
        )}
      </header>
      <div className={style.post__textWrapper}>
        <div
          className={style.post__text}
          ref={postRef}
          contentEditable={editingPostId === postId}
          suppressContentEditableWarning
        >
          {text}
        </div>
        <div className={style.post__editButtons}>
          {canEdit && (
            <button
              className={style.post__editPostButton}
              type="button"
              title={isButtonSave ? 'Сохранить пост' : 'Редактировать пост'}
              aria-label="Edit post"
              disabled={savingPostId === postId}
              onClick={onButtonClick}
            >
              {savingPostId === postId ? (
                <Preloader />
              ) : (
                <span className={style.post__buttonIcon}>
                  <img
                    src={editingPostId === postId ? saveIcon : editIcon}
                    alt="Save button icon"
                  />
                </span>
              )}
            </button>
          )}
          {editingPostId === postId && (
            <button
              className={style.post__unEdit}
              type="button"
              title="Отменить редактирование"
              onClick={onUnEditPost}
            >
              &times;
            </button>
          )}
        </div>
      </div>
      <div className={style.post__footer}>
        <div className={style.post__likes}>
          <span className={style.post__likesIcon} />
          <span className={style.post__likesCount}>{likes.length ? likes.length : null}</span>
        </div>
        <div className={style.post__comment}>
          <button
            className={style.post__commentButton}
            type="button"
            title="Комментировать"
            aria-label="Comment post"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
