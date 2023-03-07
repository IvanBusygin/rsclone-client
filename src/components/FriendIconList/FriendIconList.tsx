import React from 'react';
import classNames from 'classnames';
import style from './FriendIconList.scss';
import FriendIcon from '../FriendIcon/FriendIcon';
import { useTypedSelector } from '../../redux/hooks';

const FriendIconList = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friends_light : style.friends_dark;

  const { dataMyFriends } = useTypedSelector(({ friends }) => friends);

  const myFriends = dataMyFriends.map((friend) => (
    <FriendIcon
      image={friend.info.avatar || ''}
      name={friend.info.fullName}
      friendId={friend._id}
      key={friend._id}
    />
  ));

  myFriends.length = Math.min(myFriends.length, 4);

  return <div className={classNames(style.friends, themeClass)}>{myFriends}</div>;
};

export default FriendIconList;
