import React from 'react';
import classNames from 'classnames';
import style from './MyPageHeader.scss';
import { useTypedSelector } from '../../redux/hooks';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';

const MyPageHeader = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.myPage__header_light : style.myPage__header_dark;

  return (
    <section className={classNames(style.myPage__header, themeClass)}>
      <div className={style.myPage__userCover}>
        <img
          src=""
          alt=""
        />
      </div>
      <div className={style.myPage__userInfo}>
        <div className={style.myPage__avatar}>
          <img
            src={userDefaultAvatar}
            alt="Avatar"
            className={style.myPage__image}
          />
        </div>
        <div className={style.myPage__info}>
          <h2 className={style.myPage__name}>Петя Камушкин</h2>
          <p className={style.myPage__status}>{`I'm best of the best`}</p>
        </div>
      </div>
    </section>
  );
};

export default MyPageHeader;
