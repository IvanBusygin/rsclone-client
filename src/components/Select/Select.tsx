import React, { FC, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import classNames from 'classnames';
import style from './Select.scss';
import { ISelectProps } from '../../types/editPage';
import { useTypedSelector } from '../../redux/hooks';

const Select: FC<ISelectProps> = (props) => {
  const { selected, setSelected } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.select_light : style.select_dark;

  const [isActive, setIsActive] = useState(false);

  const options = [
    'Есть семья',
    'Встречаюсь',
    'Скоро свадьба',
    'В гражданском браке',
    'Все сложно',
    'В активном поиске',
  ];

  const onOptionClick = (value: string) => {
    setSelected(value);
    setIsActive(false);
  };

  return (
    <div className={classNames(style.select, themeClass)}>
      <button
        type="button"
        className={style.select__button}
        onClick={() => setIsActive(!isActive)}
      >
        <span>{selected}</span>
        {isActive ? (
          <ArrowDropUpIcon style={{ fontSize: 'large' }} />
        ) : (
          <ArrowDropDownIcon style={{ fontSize: 'large' }} />
        )}
      </button>
      {isActive && (
        <div className={style.select__content}>
          {options.map((option) => (
            <div
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
