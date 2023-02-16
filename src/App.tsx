import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyPage from './pages/MyPage/MyPage';
import EditPage from './pages/EditPage/EditPage';
import Layout from './components/Layouts/Layout';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import InboxFriends from './components/InboxFriends/InboxFriends';
import OutboxFriends from './components/OutboxFriends/OutboxFriends';
import SearchFriendsForm from './components/SearchFriendsForm/SearchFriendsForm';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
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
      </Route>
    </Routes>
  );
}

export default App;
