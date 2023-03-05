import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import style from './UserPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import getUserInfo from '../../redux/thunks/userPageThunks';
import PageHeader from '../../components/PageHeader/PageHeader';
import ButtonAddToFriend from '../../components/friends/ButtonAddToFriend/ButtonAddToFriend';
import useResetAuth from '../../utils/useResetAuth';

const UserPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const { info, loadingInfo, friendStatus } = useTypedSelector(({ userPage }) => userPage);

  const themeClass = isLightTheme ? style.userPage_light : style.userPage_dark;

  const resetAuth = useResetAuth();
  useEffect(() => {
    resetAuth();
  }, [loadingInfo, resetAuth]);

  const { id } = useParams();

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getUserInfo(id));
    }
  }, [id, dispatch]);

  const navigate = useNavigate();
  if (friendStatus === 0) {
    navigate(`/friend/${id}`);
    console.log('navigate');
  }

  return (
    <div className={style.userPage}>
      <PageHeader
        info={info}
        theme={isLightTheme}
      />

      <div className={classNames(style.userPage__attention, themeClass)}>
        {friendStatus === 1 ? (
          <p className={style.userPage__message}>
            <span className={style.userPage__messageLeft}>Заявка отправлена, </span>
            <span className={style.userPage__messageRight}>
              дождитесь когда {`${info.firstName} ${info.lastName}`} примет вашу заявку
            </span>
          </p>
        ) : (
          <>
            <p className={style.userPage__message}>
              <span className={style.userPage__messageLeft}>Чтобы просматривать посты, </span>
              <span className={style.userPage__messageRight}>
                добавьте {`${info.firstName} ${info.lastName}`} в друзья
              </span>
            </p>
            <ButtonAddToFriend
              id={id || ''}
              friendStatus={friendStatus}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
