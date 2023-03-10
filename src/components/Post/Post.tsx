import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import style from './Post.scss';
import { IPostProps } from '../../types/myPage';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import getLocaleTimeString from '../../utils/myPage';
import {
  addLike,
  deletePersonPost,
  editPersonPost,
  removeLike,
} from '../../redux/thunks/myPageThunks';
import { editPost, unEditPost } from '../../redux/slices/myPageSlice';
import editIcon from '../../assets/img/svg/settings_icon.svg';
import saveIcon from '../../assets/img/svg/save-button_icon.svg';
import Preloader from '../Preloader/Preloader';
import { postComment } from '../../redux/thunks/friendPageThunk';
import Comment from '../Comment/Comment';
import { setCommentedPostId } from '../../redux/slices/friendPageSlice';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';
import LikeItem from '../LikeItem/LikeItem';
import { LS_USER_ID } from '../../utils/constants';

const Post: FC<IPostProps> = (props) => {
  const {
    postId,
    firstName,
    lastName,
    avatar,
    text,
    time,
    likes,
    editTime,
    comments,
    canEdit,
    canComment,
  } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.post_light : style.post_dark;

  const { deletingPostId, editingPostId, savingPostId, successfullySavedPostId } = useTypedSelector(
    ({ myPage }) => myPage,
  );
  const { loadingComments, commentPostId, isCommentLoading } = useTypedSelector(
    ({ friendPage }) => friendPage,
  );
  const postClass = deletingPostId === postId ? style.post_remove : null;

  const [isButtonSave, setIsButtonSave] = useState(false);
  const [postTempText, setPostTempText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [isLikeAdded, setIsLikeAdded] = useState(false);

  const dispatch = useTypedDispatch();

  const postRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  }, [showTextarea]);

  useEffect(() => {
    if (commentPostId === postId) {
      setShowTextarea(true);
    } else {
      setShowTextarea(false);
    }
  }, [commentPostId, postId]);

  useEffect(() => {
    const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');
    const isLike = likes.some((like) => like.userId === USER_ID);

    if (isLike) {
      setIsLikeAdded(true);
    } else {
      setIsLikeAdded(false);
    }
  }, [likes]);

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

  const onShowTextFieldButtonClick = () => {
    setCommentText('');

    if (!showTextarea) {
      dispatch(setCommentedPostId({ postId }));
    }
  };

  const onCommentButtonClick = () => {
    if (commentText) {
      dispatch(postComment({ postId, comment: commentText }));
    }
  };

  const onCloseFieldButtonClick = () => {
    dispatch(setCommentedPostId({ postId: '' }));
    setCommentText('');
  };

  const onLikeClick = () => {
    if (!isLikeAdded) {
      dispatch(addLike(postId));
    } else {
      dispatch(removeLike(postId));
    }
  };

  const onShowLikeUsers = () => {
    setShowLikes(true);
  };

  const onHideLikeUsers = () => {
    setShowLikes(false);
  };

  return (
    <div className={classNames(style.post, postClass, themeClass)}>
      <header className={style.post__header}>
        <div className={style.post__avatar}>
          <img
            src={avatar || userDefaultAvatar}
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
                (??????.)
              </span>
            )}
          </div>
        </div>
        {canEdit && (
          <button
            className={style.post__deletePostButton}
            type="button"
            title="?????????????? ????????"
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
              title={isButtonSave ? '?????????????????? ????????' : '?????????????????????????? ????????'}
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
              title="???????????????? ????????????????????????????"
              onClick={onUnEditPost}
            >
              &times;
            </button>
          )}
        </div>
      </div>
      <div>
        {loadingComments ? (
          <div className={style.post__preloader}>
            <Preloader />
          </div>
        ) : (
          comments.map(({ id, authorAvatar, date, authorFullName, text: postText, canDelete }) => (
            <Comment
              key={id}
              id={id}
              postId={postId}
              avatar={authorAvatar}
              date={date}
              fullName={authorFullName}
              text={postText}
              canDelete={canDelete}
            />
          ))
        )}
      </div>
      <div className={style.post__footer}>
        <div className={style.post__likesButton}>
          <button
            className={style.post__likesIcon}
            type="button"
            aria-label="Add like"
            onClick={onLikeClick}
            onMouseOver={onShowLikeUsers}
            onMouseOut={onHideLikeUsers}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <span className={style.post__likesCount}>{likes.length ? likes.length : null}</span>
        </div>
        {showLikes && !!likes.length && (
          <div className={style.post__likes}>
            {likes.map((like) => (
              <LikeItem
                key={like.id}
                avatar={like.userAvatar || userDefaultAvatar}
                userFullName={like.userFullName}
              />
            ))}
          </div>
        )}
        {canComment && (
          <>
            <div className={style.post__comment}>
              <button
                className={style.post__commentButton}
                type="button"
                title="????????????????????????????"
                aria-label="Comment post"
                onClick={onShowTextFieldButtonClick}
              />
            </div>
            {showTextarea && (
              <div className={style.post__commentField}>
                <textarea
                  className={style.post__commentTextarea}
                  ref={commentRef}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className={style.post__saveComment}
                  type="button"
                  title="?????????????????? ??????????????????????"
                  aria-label="Save comment"
                  disabled={!commentText}
                  onClick={onCommentButtonClick}
                >
                  {isCommentLoading ? (
                    <Preloader />
                  ) : (
                    <span className={style.post__buttonIcon}>
                      <img
                        src={saveIcon}
                        alt="Comment button icon"
                      />
                    </span>
                  )}
                </button>
                <button
                  className={style.post__closeTextarea}
                  type="button"
                  title="?????????????? ???????? ??????????"
                  aria-label="Close"
                  disabled={isCommentLoading}
                  onClick={onCloseFieldButtonClick}
                >
                  &times;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
