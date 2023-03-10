import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './FriendCard.scss';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { IInComming } from '../../../types/friends';
import { fetchAcceptFriend, fetchFriendIn } from '../../../redux/slices/friendsSlice';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';
import Preloader from '../../Preloader/Preloader';

interface IProps {
  data: IInComming;
}

const FriendCardIn = ({ data }: IProps) => {
  const { requester } = data;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  const dispatch = useTypedDispatch();
  const { loadingAccept } = useTypedSelector(({ friends }) => friends);

  const [stateLoading, setStateLoading] = useState(false);

  useEffect(() => {
    if (loadingAccept === false) setStateLoading(false);
  }, [loadingAccept]);

  const acceptHandler = () => {
    setStateLoading(true);
    dispatch(fetchAcceptFriend(requester._id)).then(() => dispatch(fetchFriendIn()));
  };

  return (
    <div className={classNames(style.friendCard, themeClass)}>
      <Link
        to={`/user/${requester._id}`}
        target="_self"
        className={style.friendCard__container}
      >
        <div className={style.friendCard__avatar}>
          <img
            className={style.friendCard__avatar}
            src={requester.info.avatar || userDefaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className={style.friendCard__info}>
          <p className={style.friendCard__name}>{requester.info.fullName}</p>
        </div>
      </Link>
      <button
        className={style.friendCard__btn}
        type="button"
        onClick={acceptHandler}
      >
        {stateLoading && loadingAccept ? <Preloader /> : 'Принять'}
      </button>
    </div>
  );
};

export default FriendCardIn;
