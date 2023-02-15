import React from 'react';
import classNames from 'classnames';
import style from './SearchFriendsForm.scss';
import { useTypedSelector } from '../../redux/hooks';

const SearchFriendsForm = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.searchForm_light : style.searchForm_dark;

  return (
    <div className={classNames(style.searchForm, themeClass)}>
      <input
        className={style.searchForm__field}
        type="text"
        placeholder="Имя"
      />
      <input
        className={style.searchForm__field}
        type="text"
        placeholder="Фамилия"
      />
      <input
        className={style.searchForm__field}
        type="text"
        placeholder="Город"
      />
      <button
        type="button"
        className={style.searchForm__button}
      >
        Найти
      </button>
    </div>
  );
};

export default SearchFriendsForm;
