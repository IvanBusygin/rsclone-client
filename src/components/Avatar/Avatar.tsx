import React from 'react';
import style from './Avatar.scss';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';

const Avatar = () => {
  return (
    <div className={style.avatar}>
      <label
        htmlFor="avatar-input"
        className={style.avatar__wrapper}
      >
        <img
          src={userDefaultAvatar}
          alt="Avatar"
          className={style.avatar__image}
        />
        <input
          type="file"
          id="avatar-input"
          className={style.avatar__load}
        />
      </label>
    </div>
  );
};

export default Avatar;
