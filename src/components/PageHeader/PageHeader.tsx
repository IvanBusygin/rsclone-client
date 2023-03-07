import React, { FC } from 'react';
import classNames from 'classnames';
import style from './PageHeader.scss';
import userDefaultAvatar from '../../assets/img/svg/user_default_icon.svg';
import { IPageHeaderProps } from '../../types/pageHeader';

const PageHeader: FC<IPageHeaderProps> = (props) => {
  const { theme: isLightTheme, info } = props;

  const themeClass = isLightTheme ? style.page__header_light : style.page__header_dark;

  return (
    <section className={classNames(style.page__header, themeClass)}>
      <div className={style.page__userCover}>
        <img
          src=""
          alt=""
        />
      </div>
      <div className={style.page__userInfo}>
        <div className={style.page__avatar}>
          <img
            src={info.avatar || userDefaultAvatar}
            alt="Avatar"
            className={style.page__image}
          />
        </div>
        <div className={style.page__info}>
          <h2 className={style.page__name}>{`${info.firstName} ${info.lastName}`}</h2>
          <p className={style.page__status}>{info.status}</p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
