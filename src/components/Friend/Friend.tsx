import React, { FC } from 'react';
import style from './Friend.scss';
import { IFriendProps } from '../../types/myPage';

const Friend: FC<IFriendProps> = (props) => {
  const { image, name } = props;

  return (
    <div className={style.friend}>
      <div className={style.friend__avatar}>
        <img
          src={image}
          alt="Friend avatar"
        />
      </div>
      <span className={style.friend__name}>{name.split(' ')[0]}</span>
    </div>
  );
};

export default Friend;
