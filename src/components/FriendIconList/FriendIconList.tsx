import React from 'react';
import classNames from 'classnames';
import style from './FriendIconList.scss';
import FriendIcon from '../FriendIcon/FriendIcon';
import { useTypedSelector } from '../../redux/hooks';

const FriendIconList = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friends_light : style.friends_dark;

  return (
    <div className={classNames(style.friends, themeClass)}>
      <FriendIcon
        image="https://via.placeholder.com/60"
        name="Алеша Попович"
      />
      <FriendIcon
        image="https://via.placeholder.com/60"
        name="Добрыня Никитич"
      />
      <FriendIcon
        image="https://via.placeholder.com/60"
        name="Илья Муромец"
      />
      <FriendIcon
        image="https://via.placeholder.com/60"
        name="Твоя бывшая"
      />
    </div>
  );
};

export default FriendIconList;
