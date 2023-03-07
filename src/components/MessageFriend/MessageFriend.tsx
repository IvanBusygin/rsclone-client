import React, { FC } from 'react';
import classNames from 'classnames';
import style from './MessageFriend.scss';
import { IMessengerFriendProps } from '../../types/messenger';
import { useTypedSelector } from '../../redux/hooks';

const MessageFriend: FC<IMessengerFriendProps> = (props) => {
  const { id, avatar, fullName, indicator, isChatOpen, onFriendClick } = props;

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.messageFriend_light : style.messageFriend_dark;

  return (
    <button
      className={classNames(style.messageFriend__button, themeClass)}
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
