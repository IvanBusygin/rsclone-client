import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './MessengerPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { fetchMyFriends } from '../../redux/slices/friendsSlice';
import MessengerFriendsList from '../../components/MessengerFriendsList/MessengerFriendsList';
import socket from '../../utils/socket';
import { createChat, getChat, getChats } from '../../redux/thunks/messengerThunks';
import { LS_USER_ID } from '../../utils/constants';
import isExistChat from '../../utils/messenger';
import { addMessageToCurrentChat } from '../../redux/slices/messengerSlice';

const MessengerPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.messenger_light : style.messenger_dark;
  const { dataMyFriends } = useTypedSelector(({ friends }) => friends);
  const { chats, currentChat } = useTypedSelector(({ messenger }) => messenger);
  console.log(chats);
  console.log(currentChat);

  const [messageText, setMessageText] = useState('');

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchMyFriends());
    dispatch(getChats());
  }, [dispatch]);

  useEffect(() => {
    socket.on('chat message on', (chatData) => {
      dispatch(addMessageToCurrentChat(chatData));
    });
  }, [dispatch]);

  const onFriendClick = (friendId: string) => {
    const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');
    const existChatId = isExistChat(USER_ID, friendId, chats);

    if (existChatId) {
      dispatch(getChat(existChatId));
    } else {
      dispatch(createChat(friendId));
    }
  };

  const onSendMessage = () => {
    if (currentChat) {
      const data = { chatId: currentChat.id, message: messageText };
      socket.emit('chat message emit', data);
    }

    setMessageText('');
  };

  return (
    <div className={classNames(style.messenger, themeClass)}>
      <div className={style.messenger__friends}>
        <MessengerFriendsList
          options={dataMyFriends}
          onOptionClick={onFriendClick}
        />
      </div>
      <div className={style.messenger__chat}>
        <div className={style.messenger__chatMessages}>
          {currentChat &&
            currentChat.messages.map((message) => <p key={message.id}>{message.message}</p>)}
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
            onClick={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
