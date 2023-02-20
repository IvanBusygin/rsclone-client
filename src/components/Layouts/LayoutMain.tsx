import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import style from './Layout.scss';
import { useTypedSelector } from '../../redux/hooks';
import Nav from '../Navigation/Nav/Nav';

function LayoutMain() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.main_light : style.main_dark;

  const location = useLocation();
  const isAuth = useTypedSelector((state) => state.auth.isAuth);

  return isAuth ? (
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
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
}

export default LayoutMain;
