import React, { useEffect } from 'react';
import style from './FriendsBox.scss';
import FriendCardOut from '../FriendCards/FriendCardOut';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import Preloader from '../../Preloader/Preloader';
import { fetchFriendOut } from '../../../redux/slices/friendsSlice';
import useResetAuth from '../../../utils/useResetAuth';

const OutFriendsBox = () => {
  const dispatch = useTypedDispatch();
  const { loadingCount, dataOutFriends } = useTypedSelector(({ friends }) => friends);

  const resetAuth = useResetAuth();
  useEffect(() => {
    resetAuth();
  }, [loadingCount, resetAuth]);

  useEffect(() => {
    dispatch(fetchFriendOut());
  }, [dispatch]);

  const friendsOut = dataOutFriends.map((friend) => (
    <FriendCardOut
      key={friend.recipient._id}
      data={friend}
    />
  ));

  return (
    <div>
      {loadingCount && friendsOut.length === 0 ? (
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
