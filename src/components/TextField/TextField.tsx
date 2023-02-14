import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import style from './TextField.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { addPost } from '../../redux/slices/myPageSlice';

const TextField = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme
    ? style.textField__textarea_light
    : style.textField__textarea_dark;

  const dispatch = useTypedDispatch();

  const [value, setValue] = useState('');

  moment.locale('ru');

  const onButtonClick = () => {
    setValue('');
    dispatch(addPost({ text: value, creationTime: moment().format('DD MMM YYYY HH:mm') }));
  };

  return (
    <div className={style.textField}>
      <textarea
        className={classNames(style.textField__textarea, themeClass)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
