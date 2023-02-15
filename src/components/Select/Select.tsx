import React, { FC, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import classNames from 'classnames';
import style from './Select.scss';
import { ISelectProps } from '../../types/editPage';
import { useTypedSelector } from '../../redux/hooks';

const Select: FC<ISelectProps> = (props) => {
  const { options, selected, setSelected } = props;

  const [isActive, setIsActive] = useState(false);

  const zIndexClass = isActive ? style.zIndex : null;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.select_light : style.select_dark;

  const onOptionClick = (value: string) => {
    setSelected(value);
    setIsActive(false);
  };

  return (
    <div
      className={classNames(style.select, themeClass)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={style.select__selectedItem}>
        <span>{selected}</span>
        {isActive ? (
          <ArrowDropUpIcon style={{ fontSize: 'large' }} />
        ) : (
          <ArrowDropDownIcon style={{ fontSize: 'large' }} />
        )}
      </div>
      {isActive && (
        <div className={classNames(style.select__content, zIndexClass)}>
          {options.map((option) => (
            <div
              key={option}
              className={style.select__item}
              onClick={() => onOptionClick(option)}
              onKeyDown={() => onOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
