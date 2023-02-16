import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import style from './NotFoundPage.scss';
import { useTypedSelector } from '../../redux/hooks';

function NotFoundPage() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.page_light : style.page_dark;

  const navigate = useNavigate();

  const toHomeHandler = () => {
    navigate('/');
  };

  return (
    <div className={classNames(themeClass, style.page__container)}>
      <p className={style.n404}>404</p>
      <p className={style.page_title}>Page not found</p>
      <button
        type="button"
        className={style.btn}
        onClick={toHomeHandler}
      >
        GO HOME
      </button>
    </div>
  );
}

export default NotFoundPage;
