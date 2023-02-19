import React, { ChangeEvent, useEffect } from 'react';
import classNames from 'classnames';
import style from './EditPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import Select from '../../components/Select/Select';
import Birthday from '../../components/Birthday/Birthday';
import { updateUserInfo } from '../../redux/slices/editPageSlice';
import { getUserInfo, postUserInfo } from '../../redux/thunks';

const EditPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.editPage_light : style.editPage_dark;

  const { infoData } = useTypedSelector(({ editPage }) => editPage);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const options = [
    'Есть семья',
    'Встречаюсь',
    'Скоро свадьба',
    'В гражданском браке',
    'Все сложно',
    'В активном поиске',
  ];

  const loadUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      const image = file[0];
      const reader = new FileReader();

      reader.onload = () => {
        dispatch(updateUserInfo({ avatar: String(reader.result) }));
      };

      if (image) {
        reader.readAsDataURL(image);
      }
    }
  };

  const getInfo = (value: { [key: string]: string }) => {
    dispatch(updateUserInfo(value));
  };

  const onSaveButtonClick = () => {
    dispatch(postUserInfo());
  };

  return (
    <div className={classNames(style.editPage, themeClass)}>
      <div className={style.editPage__wrapper}>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Аватар:</p>
          <div className={classNames(style.editPage__field, style.editPage__fileWrapper)}>
            <label htmlFor="file">
              Выберите файл
              <input
                type="file"
                id="file"
                onChange={loadUserAvatar}
              />
            </label>
          </div>
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Имя:</p>
          <input
            type="text"
            className={style.editPage__field}
            value={infoData.firstName}
            onChange={(e) => getInfo({ firstName: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Фамилия:</p>
          <input
            type="text"
            className={style.editPage__field}
            value={infoData.lastName}
            onChange={(e) => getInfo({ lastName: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>День рождения:</p>
          <Birthday
            date={infoData.birthDate}
            returnInfo={getInfo}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Статус:</p>
          <input
            type="text"
            className={style.editPage__field}
            value={infoData.status}
            onChange={(e) => getInfo({ status: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Семейное положение:</p>
          <div className={style.editPage__familyStatus}>
            <Select
              options={options}
              selected={infoData.familyStatus}
              fieldName="familyStatus"
              returnInfo={getInfo}
            />
          </div>
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Родной город:</p>
          <input
            type="text"
            className={style.editPage__field}
            value={infoData.hometown}
            onChange={(e) => getInfo({ hometown: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Школа:</p>
          <input
            type="text"
            className={style.editPage__field}
            value={infoData.school}
            onChange={(e) => getInfo({ school: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>ВУЗ:</p>
          <input
            type="text"
            className={style.editPage__field}
            value={infoData.university}
            onChange={(e) => getInfo({ university: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Интересы:</p>
          <textarea
            className={style.editPage__textarea}
            value={infoData.interests}
            onChange={(e) => getInfo({ interests: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Жизненная позиция:</p>
          <textarea
            className={style.editPage__textarea}
            value={infoData.lifePosition}
            onChange={(e) => getInfo({ lifePosition: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимая музыка:</p>
          <textarea
            className={style.editPage__textarea}
            value={infoData.favoriteMusic}
            onChange={(e) => getInfo({ favoriteMusic: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые книги:</p>
          <textarea
            className={style.editPage__textarea}
            value={infoData.favoriteBooks}
            onChange={(e) => getInfo({ favoriteBooks: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые фильмы:</p>
          <textarea
            className={style.editPage__textarea}
            value={infoData.favoriteFilms}
            onChange={(e) => getInfo({ favoriteFilms: e.target.value })}
          />
        </div>
      </div>
      <button
        type="button"
        className={style.editPage__button}
        onClick={onSaveButtonClick}
      >
        Сохранить
      </button>
    </div>
  );
};

export default EditPage;
