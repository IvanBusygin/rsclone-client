import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './EditButton.scss';
import { useTypedSelector } from '../../redux/hooks';

const EditButton = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.edit_light : style.edit_dark;

  return (
    <Link to="/edit">
      <div className={classNames(style.edit, themeClass)}>
        <span className={style.edit__icon} />
        <p className={style.edit__description}>Добавьте информацию о себе</p>
      </div>
    </Link>
  );
};

export default EditButton;
