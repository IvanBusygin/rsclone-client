import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import style from './EditPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import Select from '../../components/Select/Select';
import Birthday from '../../components/Birthday/Birthday';
import { updateUserInfo } from '../../redux/slices/editPageSlice';
import { getUserInfo, postUserInfo } from '../../redux/thunks';
import { IUserInfo } from '../../types/editPage';
import {
  MAX_LENGTH_NAME,
  MIN_LENGTH_NAME,
  MAX_LENGTH_CITY,
  MAX_LENGTH_EDUCATION,
  MAX_LENGTH_TEXT,
  MAX_SIZE_FILE,
} from '../../utils/constants';
import Preloader from '../../components/Preloader/Preloader';

enum ErrorMsg {
  max_length_name = 'Максимальная длина 20 символов',
  min_length_name = 'Минимальная длина 2 символа',
  max_length_city = 'Максимальная длина 30 символов',
  max_length_education = 'Максимальная длина 50 символов',
  max_length_text = 'Максимальная длина 140 символа',
}

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserInfo>({});

  const onSaveButtonClick: SubmitHandler<IUserInfo> = (date) => {
    console.log(date);
    dispatch(postUserInfo());
  };

  return (
    <div className={classNames(style.editPage, themeClass)}>
      <form
        className={style.editPage__wrapper}
        onSubmit={handleSubmit(onSaveButtonClick)}
      >
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
            {...register('firstName', {
              minLength: {
                value: MIN_LENGTH_NAME,
                message: ErrorMsg.min_length_name,
              },
              maxLength: {
                value: MAX_LENGTH_NAME,
                message: ErrorMsg.max_length_name,
              },
            })}
            className={style.editPage__field}
            value={infoData.firstName}
            onChange={(e) => getInfo({ firstName: e.target.value })}
          />
          <div className={style.error}>
            {errors.firstName && <p className={style.error__input}>{errors.firstName.message}</p>}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Фамилия:</p>
          <input
            type="text"
            {...register('lastName', {
              minLength: {
                value: MIN_LENGTH_NAME,
                message: ErrorMsg.min_length_name,
              },
              maxLength: {
                value: MAX_LENGTH_NAME,
                message: ErrorMsg.max_length_name,
              },
            })}
            className={style.editPage__field}
            value={infoData.lastName}
            onChange={(e) => getInfo({ lastName: e.target.value })}
          />
          <div className={style.error}>
            {errors.lastName && <p className={style.error__input}>{errors.lastName.message}</p>}
          </div>
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
            {...register('status', {
              minLength: {
                value: MIN_LENGTH_NAME,
                message: ErrorMsg.min_length_name,
              },
              maxLength: {
                value: MAX_LENGTH_TEXT,
                message: ErrorMsg.max_length_text,
              },
            })}
            className={style.editPage__field}
            value={infoData.status}
            onChange={(e) => getInfo({ status: e.target.value })}
          />
          <div className={style.error}>
            {errors.status && <p className={style.error__input}>{errors.status.message}</p>}
          </div>
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
            {...register('hometown', {
              maxLength: {
                value: MAX_LENGTH_CITY,
                message: ErrorMsg.max_length_city,
              },
            })}
            className={style.editPage__field}
            value={infoData.hometown}
            onChange={(e) => getInfo({ hometown: e.target.value })}
          />
          <div className={style.error}>
            {errors.hometown && <p className={style.error__input}>{errors.hometown.message}</p>}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Школа:</p>
          <input
            type="text"
            {...register('school', {
              maxLength: {
                value: MAX_LENGTH_EDUCATION,
                message: ErrorMsg.max_length_education,
              },
            })}
            className={style.editPage__field}
            value={infoData.school}
            onChange={(e) => getInfo({ school: e.target.value })}
          />
          <div className={style.error}>
            {errors.school && <p className={style.error__input}>{errors.school.message}</p>}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>ВУЗ:</p>
          <input
            type="text"
            {...register('university', {
              maxLength: {
                value: MAX_LENGTH_EDUCATION,
                message: ErrorMsg.max_length_education,
              },
            })}
            className={style.editPage__field}
            value={infoData.university}
            onChange={(e) => getInfo({ university: e.target.value })}
          />
          <div className={style.error}>
            {errors.university && <p className={style.error__input}>{errors.university.message}</p>}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Интересы:</p>
          <textarea
            {...register('interests', {
              maxLength: {
                value: MAX_LENGTH_TEXT,
                message: ErrorMsg.max_length_text,
              },
            })}
            className={style.editPage__textarea}
            value={infoData.interests}
            onChange={(e) => getInfo({ interests: e.target.value })}
          />
          <div className={style.error}>
            {errors.interests && (
              <p className={style.error__textarea}>{errors.interests.message}</p>
            )}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Жизненная позиция:</p>
          <textarea
            {...register('lifePosition', {
              maxLength: {
                value: MAX_LENGTH_TEXT,
                message: ErrorMsg.max_length_text,
              },
            })}
            className={style.editPage__textarea}
            value={infoData.lifePosition}
            onChange={(e) => getInfo({ lifePosition: e.target.value })}
          />
          <div className={style.error}>
            {errors.lifePosition && (
              <p className={style.error__textarea}>{errors.lifePosition.message}</p>
            )}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимая музыка:</p>
          <textarea
            {...register('favoriteMusic', {
              maxLength: {
                value: MAX_LENGTH_TEXT,
                message: ErrorMsg.max_length_text,
              },
            })}
            className={style.editPage__textarea}
            value={infoData.favoriteMusic}
            onChange={(e) => getInfo({ favoriteMusic: e.target.value })}
          />
          <div className={style.error}>
            {errors.favoriteMusic && (
              <p className={style.error__textarea}>{errors.favoriteMusic.message}</p>
            )}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые книги:</p>
          <textarea
            {...register('favoriteBooks', {
              maxLength: {
                value: MAX_LENGTH_TEXT,
                message: ErrorMsg.max_length_text,
              },
            })}
            className={style.editPage__textarea}
            value={infoData.favoriteBooks}
            onChange={(e) => getInfo({ favoriteBooks: e.target.value })}
          />
          <div className={style.error}>
            {errors.favoriteBooks && (
              <p className={style.error__textarea}>{errors.favoriteBooks.message}</p>
            )}
          </div>
        </div>

        <div className={style.editPage__item}>
          <p className={style.editPage__label}>Любимые фильмы:</p>
          <textarea
            {...register('favoriteFilms', {
              maxLength: {
                value: MAX_LENGTH_TEXT,
                message: ErrorMsg.max_length_text,
              },
            })}
            className={style.editPage__textarea}
            value={infoData.favoriteFilms}
            onChange={(e) => getInfo({ favoriteFilms: e.target.value })}
          />
          <div className={style.error}>
            {errors.favoriteFilms && (
              <p className={style.error__textarea}>{errors.favoriteFilms.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={style.editPage__button}
        >
          {isLoading ? <Preloader /> : 'Сохранить'}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
