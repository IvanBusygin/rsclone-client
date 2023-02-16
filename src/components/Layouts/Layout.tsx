import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import style from './Layout.scss';
import { useTypedSelector } from '../../redux/hooks';
import Nav from '../Navigation/Nav/Nav';

function Layout() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.main_light : style.main_dark;

  return (
    <div className={style.app}>
      <Header />
      <main className={classNames(style.main, themeClass)}>
        <div className={style.main__container}>
          <Nav />
          <div className={style.main__content}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
