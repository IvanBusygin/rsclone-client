import React, { useState } from 'react';
import classNames from 'classnames';
import style from './SelectTheme.scss';
import selectMode from '../../assets/img/svg/select-mode.svg';
import selectModeWhite from '../../assets/img/svg/select-mode-white.svg';

import { useTypedSelector } from '../../redux/hooks';
import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
import Logout from '../Logout/Logout';

const SelectTheme = () => {
  const [isActive, setIsActive] = useState(false);
  const isAuth = useTypedSelector(({ auth }) => auth.isAuth);

  const zIndexClass = isActive ? style.zIndex : null;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.select_light : style.select_dark;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={classNames(style.select, themeClass)}
      onClick={() => setIsActive((prevState) => !prevState)}
    >
      <div className={style.select__selectedItem}>
        <img
          className={style.select__img}
          src={isLightTheme ? selectMode : selectModeWhite}
          alt="select"
        />
      </div>
      {isActive && (
        <div className={classNames(style.select__content, zIndexClass)}>
          <ToggleThemeButton />
          {isAuth && <Logout />}
        </div>
      )}
    </div>
  );
};

export default SelectTheme;
