import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './EditPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import Select from '../../components/Select/Select';
import Birthday from '../../components/Birthday/Birthday';
import { updateUserInfo } from '../../redux/slices/editPageSlice';
import { getUserInfo, postUserInfo } from '../../redux/thunks';
import {
  MAX_LENGTH_CITY,
  MAX_LENGTH_NAME,
  MAX_LENGTH_EDUCATION,
  MAX_LENGTH_TEXT,
  MAX_SIZE_FILE,
  MIN_LENGTH_NAME,
} from '../../utils/constants';
import Preloader from '../../components/Preloader/Preloader';

const EditPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.editPage_light : style.editPage_dark;

  const { infoData, isLoading } = useTypedSelector(({ editPage }) => editPage);

  const [buttonName, setButtonName] = useState('Выберите файл');

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
      if (file[0].size > MAX_SIZE_FILE) {
        setButtonName('Не больше 5Mb');
      } else {
        setButtonName('Выберите файл');
        const image = file[0];
        const reader = new FileReader();

        reader.onload = () => {
          dispatch(updateUserInfo({ avatar: String(reader.result) }));
        };

        if (image) {
          reader.readAsDataURL(image);
        }
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
              {buttonName}
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                id="file"
                onChange={loadUserAvatar}
              />
            </label>
            {infoData.avatar && (
              <div className={style.editPage__avatar}>
                <img
                  src={infoData.avatar}
                  alt="Avatar"
                />
              </div>
            )}
          </div>
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Имя:</p>
          <input
            type="text"
            minLength={MIN_LENGTH_NAME}
            maxLength={MAX_LENGTH_NAME}
            className={style.editPage__field}
            value={infoData.firstName}
            onChange={(e) => getInfo({ firstName: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Фамилия:</p>
          <input
            type="text"
            minLength={MIN_LENGTH_NAME}
            maxLength={MAX_LENGTH_NAME}
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
            maxLength={MAX_LENGTH_TEXT}
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
            maxLength={MAX_LENGTH_CITY}
            className={style.editPage__field}
            value={infoData.hometown}
            onChange={(e) => getInfo({ hometown: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Школа:</p>
          <input
            type="text"
            maxLength={MAX_LENGTH_EDUCATION}
            className={style.editPage__field}
            value={infoData.school}
            onChange={(e) => getInfo({ school: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>ВУЗ:</p>
          <input
            type="text"
            maxLength={MAX_LENGTH_EDUCATION}
            className={style.editPage__field}
            value={infoData.university}
            onChange={(e) => getInfo({ university: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Интересы:</p>
          <textarea
            maxLength={MAX_LENGTH_TEXT}
            className={style.editPage__textarea}
            value={infoData.interests}
            onChange={(e) => getInfo({ interests: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Жизненная позиция:</p>
          <textarea
            maxLength={MAX_LENGTH_TEXT}
            className={style.editPage__textarea}
            value={infoData.lifePosition}
            onChange={(e) => getInfo({ lifePosition: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимая музыка:</p>
          <textarea
            maxLength={MAX_LENGTH_TEXT}
            className={style.editPage__textarea}
            value={infoData.favoriteMusic}
            onChange={(e) => getInfo({ favoriteMusic: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые книги:</p>
          <textarea
            maxLength={MAX_LENGTH_TEXT}
            className={style.editPage__textarea}
            value={infoData.favoriteBooks}
            onChange={(e) => getInfo({ favoriteBooks: e.target.value })}
          />
        </div>
        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые фильмы:</p>
          <textarea
            maxLength={MAX_LENGTH_TEXT}
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
        {isLoading ? <Preloader /> : 'Сохранить'}
      </button>
    </div>
  );
};

export default EditPage;
