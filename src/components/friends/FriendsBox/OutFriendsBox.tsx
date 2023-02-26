import React, { useEffect } from 'react';
import style from './FriendsBox.scss';
import FriendCardOut from '../FriendCards/FriendCardOut';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import Preloader from '../../Preloader/Preloader';
import { fetchFriendOut } from '../../../redux/slices/friendsSlice';

const OutFriendsBox = () => {
  const dispatch = useTypedDispatch();
  const { loadingCount, dataOutFriends } = useTypedSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(fetchFriendOut());
  }, [dispatch]);

  console.log('dataFriendOut', dataOutFriends);

  const friendsOut = dataOutFriends.map((friend) => (
    <FriendCardOut
      key={friend.recipient._id}
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
        friendsOut
      )}
    </div>
  );
};

export default OutFriendsBox;
