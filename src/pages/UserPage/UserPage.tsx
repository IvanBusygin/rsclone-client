import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import style from './UserPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import getUserInfo from '../../redux/thunks/userPageThunks';
import PageHeader from '../../components/PageHeader/PageHeader';
import ButtonAddToFriend from '../../components/friends/ButtonAddToFriend/ButtonAddToFriend';

const UserPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const { info } = useTypedSelector(({ userPage }) => userPage);

  const themeClass = isLightTheme ? style.userPage_light : style.userPage_dark;

  const { id } = useParams();

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getUserInfo(id));
    }
  }, [id, dispatch]);

  return (
    <div className={style.userPage}>
      <PageHeader
        info={info}
        theme={isLightTheme}
      />
      <div className={classNames(style.userPage__attention, themeClass)}>
        <p className={style.userPage__message}>
          <span className={style.userPage__messageLeft}>Чтобы просматривать посты, </span>
          <span className={style.userPage__messageRight}>
            добавьте {`${info.firstName} ${info.lastName}`} в друзья
          </span>
        </p>
        <ButtonAddToFriend id={id || ''} />
      </div>
    </div>
  );
};

export default UserPage;
