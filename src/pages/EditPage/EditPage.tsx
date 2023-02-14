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
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Школа:</p>
          <input
            type="text"
            className={style.editPage__field}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>ВУЗ:</p>
          <input
            type="text"
            className={style.editPage__field}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Интересы:</p>
          <textarea className={style.editPage__textarea} />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Жизненная позиция:</p>
          <textarea className={style.editPage__textarea} />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимая музыка:</p>
          <textarea className={style.editPage__textarea} />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые книги:</p>
          <textarea className={style.editPage__textarea} />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые фильмы:</p>
          <textarea className={style.editPage__textarea} />
        </div>
      </div>
      <button
        type="button"
        className={style.editPage__button}
      >
        Сохранить
      </button>
    </div>
  );
};

export default EditPage;
