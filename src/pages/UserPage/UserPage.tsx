import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import style from './UserPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import getUserInfo from '../../redux/thunks/userPageThunks';
import PageHeader from '../../components/PageHeader/PageHeader';

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
      <p className={classNames(style.userPage__attention, themeClass)}>
        Чтобы просматривать посты {`${info.firstName} ${info.lastName}`} добавьте его в друзья
      </p>
    </div>
  );
};

export default UserPage;
