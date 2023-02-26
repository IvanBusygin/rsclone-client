import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutMain from './components/Layouts/LayoutMain';
import LayoutLogin from './components/Layouts/LayoutLogin';
import MyPage from './pages/MyPage/MyPage';
import EditPage from './pages/EditPage/EditPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import InFriendsBox from './components/friends/FriendsBox/InFriendsBox';
import OutFriendsBox from './components/friends/FriendsBox/OutFriendsBox';
import SearchFriendsForm from './components/friends/SearchFriendsForm/SearchFriendsForm';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MessengerPage from './pages/MessengerPage/MessengerPage';
import MyFriendsBox from './components/friends/FriendsBox/MyFriendsBox';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LayoutMain />}
      >
        <Route
          index
          element={<MyPage />}
        />
        <Route
          path="edit"
          element={<EditPage />}
        />
        <Route
          path="friends"
          element={<FriendsPage />}
        >
          <Route
            index
            element={<MyFriendsBox />}
          />
          <Route
            path="inbox"
            element={<InFriendsBox />}
          />
          <Route
            path="outbox"
            element={<OutFriendsBox />}
          />
          <Route
            path="search"
            element={<SearchFriendsForm />}
          />
        </Route>
        <Route
          path="messenger"
          element={<MessengerPage />}
        />
        <Route
          path="user/:id"
          element={<UserPage />}
        />
      </Route>
      <Route
        path="login"
        element={<LayoutLogin />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
