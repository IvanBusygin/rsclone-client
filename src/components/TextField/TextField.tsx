import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import style from './TextField.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { updateNewPostText } from '../../redux/slices/myPageSlice';
import { postUserPost } from '../../redux/thunks/myPageThunks';
import buttonIcon from '../../assets/img/svg/send-button_icon.svg';
import Preloader from '../Preloader/Preloader';

const TextField = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme
    ? style.textField__textarea_light
    : style.textField__textarea_dark;

  const { newPostText, isLoading } = useTypedSelector(({ myPage }) => myPage);
  const buttonClass = isLoading ? style.textField__button_inActive : null;

  const onPostTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    dispatch(updateNewPostText({ text }));
  };

  const dispatch = useTypedDispatch();

  const onButtonClick = () => {
    dispatch(postUserPost());
  };

  return (
    <div className={style.textField}>
      <textarea
        className={classNames(style.textField__textarea, themeClass)}
        value={newPostText}
        onChange={onPostTextChange}
        placeholder="Что у вас нового?"
      />
      <button
        className={classNames(style.textField__button, buttonClass)}
        type="button"
        aria-label="Send post"
        disabled={!newPostText}
        onClick={onButtonClick}
      >
        {isLoading ? (
          <Preloader />
        ) : (
          <span className={style.textField__buttonIcon}>
            <img
              src={buttonIcon}
              alt="Send button icon"
            />
          </span>
        )}
      </button>
    </div>
  );
};

export default TextField;
