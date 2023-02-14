import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './InfoButton.scss';
import { useTypedSelector } from '../../redux/hooks';

const InfoButton = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.settings_light : style.settings_dark;

  return (
    <Link to="/settings">
      <div className={classNames(style.settings, themeClass)}>
        <span className={style.settings__icon} />
        <p className={style.settings__description}>Добавьте информацию о себе</p>
      </div>
    </Link>
  );
};

export default InfoButton;
