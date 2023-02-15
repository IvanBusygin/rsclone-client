import React from 'react';
import style from './InboxFriends.scss';
import FriendCard from '../FriendCard/FriendCard';

const InboxFriends = () => {
  return (
    <div className={style.inbox}>
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
};

export default InboxFriends;
