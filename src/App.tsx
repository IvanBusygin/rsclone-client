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
import FriendsPage from './pages/FriendsPage/FriendsPage';
import InboxFriends from './components/InboxFriends/InboxFriends';
import OutboxFriends from './components/OutboxFriends/OutboxFriends';
import SearchFriendsForm from './components/SearchFriendsForm/SearchFriendsForm';

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
              <Route
                path="/friends"
                element={<FriendsPage />}
              >
                <Route
                  path="inbox"
                  element={<InboxFriends />}
                />
                <Route
                  path="outbox"
                  element={<OutboxFriends />}
                />
                <Route
                  path="search"
                  element={<SearchFriendsForm />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
