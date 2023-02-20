import React from 'react';
import classNames from 'classnames';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import style from './Layout.scss';
import { useTypedSelector } from '../../redux/hooks';
import Login from '../../pages/Login/Login';

function LayoutMain() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.main_light : style.main_dark;

  return (
    <div className={style.app}>
      <Header />
      <main className={classNames(style.main, themeClass)}>
        <div>
          <Login />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LayoutMain;
