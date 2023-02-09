import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './Logo.scss';
import logoIcon from '../../assets/img/svg/logo.svg';
import { useTypedSelector } from '../../redux/hooks';

const Logo = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.logo_light : style.logo_dark;

  return (
    <Link
      to="/"
      className={classNames(style.logo, themeClass)}
    >
      <img
        className={style.logo__icon}
        src={logoIcon}
        alt="Logo"
      />
      <span className={style.logo__name}>вконтакте</span>
    </Link>
  );
};

export default Logo;
