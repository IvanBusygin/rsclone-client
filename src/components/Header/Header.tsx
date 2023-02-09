import React from 'react';
import Logo from '../Logo/Logo';
import style from './Header.scss';
import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
import { useTypedSelector } from '../../redux/hooks';

const Header = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.header_light : style.header_dark;

  return (
    <header className={themeClass}>
      <div className={style.header__container}>
        <Logo />
        <ToggleThemeButton />
      </div>
    </header>
  );
};

export default Header;
