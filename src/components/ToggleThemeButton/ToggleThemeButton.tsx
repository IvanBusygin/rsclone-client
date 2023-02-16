import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/slices/commonSlice';

const ToggleThemeButton = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const [isDarkMode, setDarkMode] = useState(!isLightTheme);
  const dispatch = useTypedDispatch();

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    dispatch(toggleTheme());
  };

  return (
    <DarkModeSwitch
      sunColor="#222222"
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={24}
    />
  );
};

export default ToggleThemeButton;
