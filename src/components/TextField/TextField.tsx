import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import style from './TextField.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { addPost, updateNewPostText } from '../../redux/slices/myPageSlice';

const TextField = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme
    ? style.textField__textarea_light
    : style.textField__textarea_dark;

  const { newPostText } = useTypedSelector(({ myPage }) => myPage);

  const onPostTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    dispatch(updateNewPostText({ text }));
  };

  const dispatch = useTypedDispatch();

  moment.locale('ru');

  const onButtonClick = () => {
    dispatch(addPost({ text: newPostText, creationTime: moment().format('DD MMM YYYY HH:mm') }));
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
        className={style.textField__button}
        type="button"
        aria-label="Send post"
        onClick={onButtonClick}
      />
    </div>
  );
};

export default TextField;
