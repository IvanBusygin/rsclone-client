import React, { useEffect } from 'react';
import style from './FriendsBox.scss';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { fetchMyFriends } from '../../../redux/slices/friendsSlice';
import Preloader from '../../Preloader/Preloader';
import FriendCardMy from '../FriendCards/FriendCardMy';
import useResetAuth from '../../../utils/useResetAuth';

const InboxFriends = () => {
  const dispatch = useTypedDispatch();
  const { loadingMyFriends, dataMyFriends } = useTypedSelector(({ friends }) => friends);

  const resetAuth = useResetAuth();
  useEffect(() => {
    resetAuth();
  }, [loadingMyFriends, resetAuth]);

  useEffect(() => {
    dispatch(fetchMyFriends());
  }, [dispatch]);

  const myFriends = dataMyFriends.map((friend) => (
    <FriendCardMy
      key={friend._id}
      friendId={friend._id}
      data={friend}
    />
  ));

  return (
    <div>
      {loadingMyFriends ? (
        <div className={style.preloader}>
          <Preloader />
        </div>
      ) : (
        myFriends
      )}
    </div>
  );
};

export default InboxFriends;
