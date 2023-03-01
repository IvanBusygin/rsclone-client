import React, { FC } from 'react';
import style from './LikeItem.scss';
import { ILikeItemProps } from '../../types/myPage';

const LikeItem: FC<ILikeItemProps> = (props) => {
  const { avatar } = props;

  return (
    <span className={style.like}>
      <img
        src={avatar}
        alt="Like"
      />
    </span>
  );
};

export default LikeItem;
