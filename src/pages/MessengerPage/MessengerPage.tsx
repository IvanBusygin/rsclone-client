import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './MessengerPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { fetchMyFriends } from '../../redux/slices/friendsSlice';
import socket from '../../utils/socket';
import { createChat, getChat, getChats } from '../../redux/thunks/messengerThunks';
import { LS_USER_ID } from '../../utils/constants';
import { isExistChat } from '../../utils/messenger';
import {
  hideIndicator,
  hidePreloader,
  showIndicator,
  showPreloader,
} from '../../redux/slices/messengerSlice';
import Preloader from '../../components/Preloader/Preloader';
import sendButtonIcon from '../../assets/img/svg/send-button_icon.svg';
import MessageFriend from '../../components/MessageFriend/MessageFriend';

const MessengerPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.messenger_light : style.messenger_dark;
  const { dataMyFriends } = useTypedSelector(({ friends }) => friends);
  const { chats, currentChat, isMessageLoading, incomingFriendId } = useTypedSelector(
    ({ messenger }) => messenger,
  );

  const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

  const [messageText, setMessageText] = useState('');

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchMyFriends());
    dispatch(getChats());
  }, [dispatch]);

  useEffect(() => {
    socket.on('chat message on', (chatData) => {
      dispatch(hidePreloader());
      dispatch(showIndicator(chatData));
      dispatch(getChat(chatData.chatId));
    });
  }, [dispatch, currentChat]);

  const onFriendClick = (friendId: string) => {
    const existChatId = isExistChat(USER_ID, friendId, chats);

    if (existChatId) {
      dispatch(getChat(existChatId));
    } else {
      dispatch(createChat(friendId));
    }

    dispatch(hideIndicator());
  };

  const onSendMessage = () => {
    if (currentChat) {
      const data = { chatId: currentChat.id, message: messageText };
      socket.emit('chat message emit', data);
      dispatch(showPreloader());
    }

    setMessageText('');
  };

  return (
    <div className={classNames(style.messenger, themeClass)}>
      <div className={style.messenger__friends}>
        <div>
          {dataMyFriends.map((friend) => (
            <MessageFriend
              key={friend._id}
              id={friend._id}
              avatar={friend.info.avatar}
              fullName={friend.info.fullName}
              indicator={incomingFriendId}
              onFriendClick={onFriendClick}
            />
          ))}
        </div>
      </div>
      <div className={style.messenger__chat}>
        <div className={style.messenger__chatMessages}>
          {currentChat &&
            currentChat.messages.map((message) => (
              <p
                key={message.id}
                className={
                  message.authorId === USER_ID
                    ? classNames(style.messenger__message, style.messenger__message_own)
                    : classNames(style.messenger__message, style.messenger__message_alien)
                }
              >
                {message.message}
              </p>
            ))}
        </div>
        <div className={style.messenger__text}>
          <textarea
            className={style.messenger__textarea}
            placeholder="Введите текст"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            className={style.messenger__button}
            type="button"
            aria-label="Send post"
            disabled={isMessageLoading}
            onClick={onSendMessage}
          >
            {isMessageLoading ? (
              <Preloader />
            ) : (
              <span className={style.messenger__buttonIcon}>
                <img
                  src={sendButtonIcon}
                  alt="Send button icon"
                />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
