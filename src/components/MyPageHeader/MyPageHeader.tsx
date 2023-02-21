import React, { useEffect } from 'react';
import classNames from 'classnames';
import style from './MyPageHeader.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';
import { getUserInfo } from '../../redux/thunks/editPageThunks';

const MyPageHeader = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.myPage__header_light : style.myPage__header_dark;

  const { infoData } = useTypedSelector(({ editPage }) => editPage);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

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
            src={infoData.avatar || userDefaultAvatar}
            alt="Avatar"
            className={style.myPage__image}
          />
        </div>
        <div className={style.myPage__info}>
          <h2 className={style.myPage__name}>{`${infoData.firstName} ${infoData.lastName}`}</h2>
          <p className={style.myPage__status}>{infoData.status}</p>
        </div>
      </div>
    </section>
  );
};

export default MyPageHeader;
