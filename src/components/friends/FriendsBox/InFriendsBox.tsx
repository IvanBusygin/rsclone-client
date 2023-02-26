import React, { useEffect } from 'react';
import style from './FriendsBox.scss';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { fetchFriendIn } from '../../../redux/slices/friendsSlice';
import Preloader from '../../Preloader/Preloader';
import FriendCardIn from '../FriendCards/FriendCardIn';

const InFriendsBox = () => {
  const dispatch = useTypedDispatch();
  const { loadingCount, dataInFriends } = useTypedSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(fetchFriendIn());
  }, [dispatch]);

  console.log('dataFriendIn', dataInFriends);

  const friendsIn = dataInFriends.map((friend) => (
    <FriendCardIn
      key={friend.requester._id}
      data={friend}
    />
  ));

  return (
    <div>
      {loadingCount ? (
        <div className={style.preloader}>
          <Preloader />
        </div>
      ) : (
        friendsIn
      )}
    </div>
  );
};

export default InFriendsBox;
