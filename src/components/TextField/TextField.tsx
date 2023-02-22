import React, { FC, useState } from 'react';
import classNames from 'classnames';
import style from './TextField.scss';
import { useTypedSelector } from '../../redux/hooks';
import buttonIcon from '../../assets/img/svg/send-button_icon.svg';
import Preloader from '../Preloader/Preloader';
import { ITextFieldProps } from '../../types/myPage';

const TextField: FC<ITextFieldProps> = (props) => {
  const { text, placeholder, onButtonClick } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme
    ? style.textField__textarea_light
    : style.textField__textarea_dark;

  const [postText, setPostText] = useState(text || '');

  const { isLoading } = useTypedSelector(({ myPage }) => myPage);
  const buttonClass = isLoading ? style.textField__button_inActive : null;

  const onSendPostClick = () => {
    onButtonClick(postText);
    setPostText('');
  };

  return (
    <div className={style.textField}>
      <textarea
        className={classNames(style.textField__textarea, themeClass)}
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder={placeholder}
      />
      <button
        className={classNames(style.textField__button, buttonClass)}
        type="button"
        aria-label="Send post"
        disabled={!postText}
        onClick={onSendPostClick}
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
