import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import style from './Sign.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import logoIcon from '../../assets/img/svg/logo.svg';
import { IFormReg } from '../../types/login';
import { fetchReg, resetDuplicate } from '../../redux/slices/authSlice';

enum ErrorMsg {
  loginReq = 'Введите ваше логин',
  loginLength = 'Не менее 4 символов',
  nameReq = 'Введите ваше имя',
  surnameReq = 'Введите вашу фамилию',
  NameLength = 'Не менее 2 символов',
  emailReq = 'Введите email',
  emailCor = 'Введите корректный email',
  passwordLength = 'Должен содержать минимум 8 символов',
  passwordReq = 'Введите пароль',
  passwordNum = 'Должен содержать число',
  passwordSym = 'Должен содержать буквенные символы',
  passwordDif = 'Пароли не совпадают',
}

const regexpEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Signup() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.page_light : style.page_dark;

  const { loading, errorDuplicate, isAuth } = useTypedSelector(({ auth }) => auth);

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setFocus,
  } = useForm<IFormReg>({});

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmitForm: SubmitHandler<IFormReg> = (data) => {
    dispatch(fetchReg(data));
  };

  useEffect(() => {
    setTimeout(() => dispatch(resetDuplicate()), 5000);
    if (loading === false && isAuth === true) {
      navigate('/');
    }
  }, [dispatch, navigate, loading, isAuth]);

  return (
    <div className={classNames(themeClass, style.page__container)}>
      <img
        className={style.icon}
        src={logoIcon}
        alt="Logo"
      />
      <div className={style.title}>Регистрация VK Clone</div>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <input
          className={style.input}
          type="text"
          {...register('name', {
            required: ErrorMsg.nameReq,
            minLength: {
              value: 2,
              message: ErrorMsg.NameLength,
            },
          })}
          placeholder="Ввидете ваше имя"
        />
        {errors.name && <p className={style.error}>{errors?.name?.message}</p>}

        <input
          className={style.input}
          type="text"
          {...register('surname', {
            required: ErrorMsg.surnameReq,
            minLength: {
              value: 2,
              message: ErrorMsg.NameLength,
            },
          })}
          placeholder="Ввидете вашу фамилию"
        />
        {errors.surname && <p className={style.error}>{errors?.surname?.message}</p>}

        <input
          className={style.input}
          type="text"
          {...register('login', {
            required: ErrorMsg.loginReq,
            minLength: {
              value: 4,
              message: ErrorMsg.loginLength,
            },
          })}
          placeholder="Ввидете ваш логин"
        />
        {errors.login && <p className={style.error}>{errors?.login?.message}</p>}

        <input
          className={style.input}
          type="email"
          {...register('email', {
            required: ErrorMsg.emailReq,
            pattern: {
              value: regexpEmail,
              message: ErrorMsg.emailCor,
            },
          })}
          placeholder="Ввидете email"
        />
        {errors.email && <p className={style.error}>{errors?.email?.message}</p>}

        <input
          className={style.input}
          type="password"
          {...register('password', {
            required: ErrorMsg.passwordReq,
            minLength: {
              value: 8,
              message: ErrorMsg.passwordLength,
            },
            validate: {
              corNun: (value) => /[0-9]/.test(value) || ErrorMsg.passwordNum,
              corSym: (value) => /[a-zа-яё]/i.test(value) || ErrorMsg.passwordSym,
            },
          })}
          placeholder="Введите пароль"
        />
        {errors.password && <p className={style.error}>{errors?.password?.message}</p>}

        <input
          className={style.input}
          type="password"
          {...register('password2', {
            required: ErrorMsg.passwordReq,
            minLength: {
              value: 8,
              message: ErrorMsg.passwordLength,
            },
            validate: {
              cor: () => getValues('password') === getValues('password2') || ErrorMsg.passwordDif,
            },
          })}
          placeholder="Повторите пароль"
        />
        {errors.password2 && <p className={style.error}>{errors?.password2?.message}</p>}

        <button
          className={style.btn}
          type="submit"
        >
          Зарегистрироваться
        </button>

        {errorDuplicate && <div className={style.errorDuplicate}>Пользователь уже существует</div>}
        {loading && <div className={style.loading}>Загрузка...</div>}
      </form>
    </div>
  );
}

export default Signup;