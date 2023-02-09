import React from 'react';
import classNames from 'classnames';
import style from './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useTypedSelector } from './redux/hooks';

function App() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.app_light : style.app_dark;

  return (
    <div className={classNames(style.app, themeClass)}>
      <Header />
      <main className={style.main}>Hello world!</main>
      <Footer />
    </div>
  );
}

export default App;
