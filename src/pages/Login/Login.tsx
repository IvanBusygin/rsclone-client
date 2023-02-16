import React, { useState } from 'react';
import classNames from 'classnames';
import Signup from '../../components/Signup/Signup';
import Signin from '../../components/Signin/Signin';
import style from './Login.scss';
import { useTypedSelector } from '../../redux/hooks';

function Login() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.page_light : style.page_dark;

  const [logState, setLogState] = useState(true);

  return (
    <div className={classNames(themeClass, style.page__container)}>
      <div className={classNames(style.inputs, style.inputs)}>
        {logState ? <Signin /> : <Signup />}

        <div className={style.ques}>
          <div className={style.ques__text}>
            {logState ? 'У вас нет аккаунта в ВК Clone?' : 'У вас есть аккаунт?'}
          </div>
          <button
            className={style.ques__btn}
            type="button"
            onClick={() => setLogState((prevState) => !prevState)}
          >
            {logState ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
