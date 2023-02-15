import React from 'react';
import style from './OutboxFriends.scss';
import FriendCard from '../FriendCard/FriendCard';

const OutboxFriends = () => {
  return (
    <div className={style.outbox}>
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
};

export default OutboxFriends;
