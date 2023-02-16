import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutMain from './components/Layouts/LayoutMain';
import LayoutLogin from './components/Layouts/LayoutLogin';
import MyPage from './pages/MyPage/MyPage';
import EditPage from './pages/EditPage/EditPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import InboxFriends from './components/InboxFriends/InboxFriends';
import OutboxFriends from './components/OutboxFriends/OutboxFriends';
import SearchFriendsForm from './components/SearchFriendsForm/SearchFriendsForm';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

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
