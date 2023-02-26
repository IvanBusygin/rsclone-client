import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './FriendCardFound.scss';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { IInComming } from '../../../types/friends';
import { fetchAcceptFriend } from '../../../redux/slices/friendsSlice';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';
import Preloader from '../../Preloader/Preloader';

interface IProps {
  data: IInComming;
}

const FriendCardFound = ({ data }: IProps) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { info, _id } = data.requester;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  const dispatch = useTypedDispatch();
  const { loadingAdd } = useTypedSelector(({ friends }) => friends);

  const [stateLoading, setStateLoading] = useState(false);

  useEffect(() => {
    if (loadingAdd === false) setStateLoading(false);
  }, [loadingAdd]);

  const addHandler = () => {
    setStateLoading(true);
    dispatch(fetchAcceptFriend(_id));
  };

  return (
    <div className={classNames(style.friendCard, themeClass)}>
      <div className={style.friendCard__container}>
        <div className={style.friendCard__avatar}>
          <img
            className={style.friendCard__avatar}
            src={info.avatar || userDefaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className={style.friendCard__info}>
          <p className={style.friendCard__name}>{info.fullName}</p>
        </div>
      </div>
      <button
        className={style.friendCard__btn}
        type="button"
        onClick={addHandler}
      >
        {stateLoading && loadingAdd ? <Preloader /> : 'Принять приглашение'}
      </button>
    </div>
  );
};

export default FriendCardFound;
