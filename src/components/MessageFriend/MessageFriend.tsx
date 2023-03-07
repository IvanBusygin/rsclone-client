import React, { FC } from 'react';
import style from './MessageFriend.scss';
import { IMessengerFriendProps } from '../../types/messenger';

const MessageFriend: FC<IMessengerFriendProps> = (props) => {
  const { id, avatar, fullName, indicator, isChatOpen, onFriendClick } = props;

  return (
    <button
      className={style.messageFriend__button}
      type="button"
      onClick={() => onFriendClick(id)}
    >
      <div className={style.messageFriend__avatar}>
        <img
          src={avatar}
          alt="friend avatar"
        />
      </div>
      <p className={style.messageFriend__name}>{fullName}</p>
      {!isChatOpen && indicator === id && <span className={style.messageFriend__indicator} />}
    </button>
  );
};

export default MessageFriend;
