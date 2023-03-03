import React, { useEffect } from 'react';
import classNames from 'classnames';
import style from './MessengerPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { fetchMyFriends } from '../../redux/slices/friendsSlice';
import MessengerFriendsList from '../../components/MessengerFriendsList/MessengerFriendsList';

const MessengerPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.messenger_light : style.messenger_dark;
  const { dataMyFriends } = useTypedSelector(({ friends }) => friends);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchMyFriends());
  }, [dispatch]);

  const onFriendClick = () => {};

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
          <p>Привет</p>
          <p>Привет</p>
        </div>
        <div className={style.messenger__text}>
          <textarea
            className={style.messenger__textarea}
            placeholder="Введите текст"
          />
          <button
            className={style.messenger__button}
            type="button"
            aria-label="Send post"
          />
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
