import React, { useState } from 'react';
import classNames from 'classnames';
import style from './EditPage.scss';
import { useTypedSelector } from '../../redux/hooks';
import Select from '../../components/Select/Select';

const EditPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.editPage_light : style.editPage_dark;

  const [selected, setSelected] = useState('Не выбрано');

  return (
    <div className={classNames(style.editPage, themeClass)}>
      <div className={style.editPage__wrapper}>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Имя:</p>
          <input
            type="text"
            className={style.editPage__field}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Фамилия:</p>
          <input
            type="text"
            className={style.editPage__field}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Статус:</p>
          <input
            type="text"
            className={style.editPage__field}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Семейное положение:</p>
          <Select
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Родной город:</p>
          <input
            type="text"
            className={style.editPage__field}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
