import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import style from './Sign.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import logoIcon from '../../assets/img/svg/logo.svg';
import { IFormLogin } from '../../types/login';
import Preloader from '../Preloader/Preloader';
import { fetchLogin, resetError } from '../../redux/slices/authSlice';

enum ErrorMsg {
  loginReq = 'Введите логин',
  loginLength = 'Логин минимум 4 символов',
  passwordReq = 'Введите пароль',
}

function Signin() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.sign_light : style.sign_dark;

  const { loading, isAuth, errorMsg } = useTypedSelector(({ auth }) => auth);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<IFormLogin>({});

  useEffect(() => {
    setFocus('login');
  }, [setFocus]);

  const resetHandler = () => {
    if (errorMsg) dispatch(resetError());
  };

  const onSubmitForm: SubmitHandler<IFormLogin> = (data) => {
    dispatch(fetchLogin(data));
  };

  useEffect(() => {
    if (loading === false && isAuth === true) {
      navigate('/');
    }
  }, [navigate, loading, isAuth]);

  return (
    <div className={classNames(themeClass, style.sign__container)}>
      <img
        className={style.icon}
        src={logoIcon}
        alt="Logo"
      />

      <div className={style.title}>Вход VK Clone</div>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <input
          className={style.input}
          type="text"
          {...register('login', {
            onChange: resetHandler,
            required: ErrorMsg.loginReq,
            minLength: {
              value: 4,
              message: ErrorMsg.loginLength,
            },
          })}
          placeholder="Введите логин или почту"
        />
        <div className={style.error}>
          {errors.login && <p className={style.error__msg}>{errors.login.message}</p>}
        </div>

        <input
          className={style.input}
          type="password"
          {...register('password', {
            onChange: resetHandler,
            required: ErrorMsg.passwordReq,
          })}
          placeholder="Введите пароль"
        />
        <div className={style.error}>
          {errors.password && <p className={style.error__msg}>{errors.password.message}</p>}
        </div>

        <button
          className={style.btn}
          type="submit"
        >
          {loading ? <Preloader /> : 'Войти'}
        </button>

        <div className={style.error}>
          {Boolean(errorMsg) && <p className={style.error__request}> {errorMsg} </p>}
        </div>
      </form>
    </div>
  );
}

export default Signin;
