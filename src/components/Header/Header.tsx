import React from 'react';
import Logo from '../Logo/Logo';
import style from './Header.scss';
import { useTypedSelector } from '../../redux/hooks';
import SelectTheme from '../SelectTheme/SelectTheme';

const Header = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.header_light : style.header_dark;

  return (
    <header className={themeClass}>
      <div className={style.header__container}>
        <Logo />
        <SelectTheme />
      </div>
    </header>
  );
};

export default Header;
