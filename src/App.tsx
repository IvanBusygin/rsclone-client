import React from 'react';
import classNames from 'classnames';
import { Route, Routes } from 'react-router-dom';
import style from './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useTypedSelector } from './redux/hooks';
import Nav from './components/Navigation/Nav/Nav';
import MyPage from './pages/MyPage/MyPage';
import EditPage from './pages/EditPage/EditPage';

function App() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.main_light : style.main_dark;

  return (
    <div className={style.app}>
      <Header />
      <main className={classNames(style.main, themeClass)}>
        <div className={style.main__container}>
          <Nav />
          <div className={style.main__content}>
            <Routes>
              <Route
                path="/"
                element={<MyPage />}
              />
              <Route
                path="/edit"
                element={<EditPage />}
              />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
