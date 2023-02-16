import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import style from './Signin.scss';
import { useTypedSelector } from '../../redux/hooks';
import logoIcon from '../../assets/img/svg/logo.svg';

interface IFormInputs {
  login: string;
  password: string;
}

enum ErrorMsg {
  loginReq = 'Введите логин',
  loginLength = 'Логина минимум 4 символов',
  passwordLength = 'Пароль минимум 8 символов',
  passwordReq = 'Enter password',
  passwordNum = 'Должен содержать число',
  passwordSym = 'Должен содержать буквенные символы',
}

function Signin() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.page_light : style.page_dark;

  const {
    register,
    formState: { errors },
    handleSubmit,
    // setValue,
  } = useForm<IFormInputs>({});

  const onSubmitForm = () => {
    console.log(' отправлено ');
  };

  return (
    <div className={classNames(themeClass, style.page__container)}>
      <img
        className={style.icon}
        src={logoIcon}
        alt="Logo"
      />
      <div className={style.title}>Вход ВК Clone</div>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmitForm)}
      >
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
          placeholder="Ввидете логин"
        />
        {errors.login && <p className={style.error}>{errors?.login?.message}</p>}

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

        <button
          className={style.btn}
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Signin;
