import React from 'react';
import classNames from 'classnames';
import style from './FriendList.scss';
import Friend from '../Friend/Friend';
import { useTypedSelector } from '../../redux/hooks';

const FriendList = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friends_light : style.friends_dark;

  return (
    <div className={classNames(style.friends, themeClass)}>
      <Friend
        image="https://via.placeholder.com/60"
        name="Алеша Попович"
      />
      <Friend
        image="https://via.placeholder.com/60"
        name="Добрыня Никитич"
      />
      <Friend
        image="https://via.placeholder.com/60"
        name="Илья Муромец"
      />
      <Friend
        image="https://via.placeholder.com/60"
        name="Твоя бывшая"
      />
    </div>
  );
};

export default FriendList;
