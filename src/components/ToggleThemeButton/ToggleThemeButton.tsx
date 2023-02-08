import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTypedDispatch } from '../../redux/hooks';
import { toggleTheme } from '../../redux/slices/commonSlice';

const ToggleThemeButton = () => {
  const [isDarkMode, setDarkMode] = useState(false);
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
