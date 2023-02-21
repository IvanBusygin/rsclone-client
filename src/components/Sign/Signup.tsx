import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import style from './Sign.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { fetchReg, resetDuplicate } from '../../redux/slices/authSlice';
import logoIcon from '../../assets/img/svg/logo.svg';
import { IFormReg } from '../../types/login';
import Preloader from '../Preloader/Preloader';

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
  passwordDif = 'Пароли не совпадают',
}

const regexpEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkPasswordSymbols = (password: string) => {
  const basicRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[!"'#$%`()*+,-./:;<>=?@[\]^&_{\\|}~])(?=.{8,})/;
  const specialRegex = /[!"'#$%`()*+,-.:;<>=?@[\]^&_{\\/|}~]/;
  const upperRegex = /[A-Z]/;
  const lowerRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const spaceRegex = /[ ]/;
  if (spaceRegex.test(password)) return 'Пароль не должен содержать пробел';
  if (!upperRegex.test(password)) return 'Пароль не включает символы в верхнем регистре';
  if (!lowerRegex.test(password)) return 'Пароль не включает символы в нижнем регистре';
  if (!numberRegex.test(password)) return 'Пароль не включает число';
  if (!specialRegex.test(password)) {
    return 'Добавте специальные символы: !@#$%^&*()-_+=,.:;<>?[]{}"\'|\\/~';
  }
  if (!basicRegex.test(password)) return 'Неверный пароль';
  return true;
};

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
        <div className={style.error}>
          {errors.name && <p className={style.error__msg}>{errors.name.message}</p>}
        </div>

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
        <div className={style.error}>
          {errors.surname && <p className={style.error__msg}>{errors.surname.message}</p>}
        </div>

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
        <div className={style.error}>
          {errors.login && <p className={style.error__msg}>{errors.login.message}</p>}
        </div>

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
        <div className={style.error}>
          {errors.email && <p className={style.error__msg}>{errors.email.message}</p>}
        </div>

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
              corPassword: (password) => checkPasswordSymbols(password),
            },
          })}
          placeholder="Введите пароль"
        />
        <div className={style.error}>
          {errors.password && <p className={style.error__msg}>{errors.password.message}</p>}
        </div>

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
        <div className={style.error}>
          {errors.password2 && <p className={style.error__msg}>{errors.password2.message}</p>}
        </div>

        <button
          className={style.btn}
          type="submit"
        >
          {loading ? <Preloader /> : 'Зарегистрироваться'}
        </button>

        {errorDuplicate && <div className={style.errorDuplicate}>Пользователь уже существует</div>}
      </form>
    </div>
  );
}

export default Signup;
