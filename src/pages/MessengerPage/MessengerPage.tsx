import React from 'react';
import classNames from 'classnames';
import style from './MessengerPage.scss';
import { useTypedSelector } from '../../redux/hooks';
import FriendCard from '../../components/FriendCard/FriendCard';

const MessengerPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.messenger_light : style.messenger_dark;

  return (
    <div className={classNames(style.messenger, themeClass)}>
      <div className={style.messenger__friends}>
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
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
