import React, { useEffect, useState } from 'react';
import Preloader from '../../Preloader/Preloader';
import {
  fetchAcceptFriend,
  fetchAddFriend,
  fetchDeleteFriend,
  fetchMyFriends,
} from '../../../redux/slices/friendsSlice';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import style from './ButtonAddToFriend.scss';
import sent from '../../../assets/img/svg/sent.svg';
import getUserInfo from '../../../redux/thunks/userPageThunks';

interface IProps {
  id: string;
  friendStatus: number | undefined;
}

function ButtonAddToFriend(props: IProps) {
  const { id, friendStatus } = props;

  const dispatch = useTypedDispatch();
  const { loadingAdd, loadingAccept, loadingDelete } = useTypedSelector(({ friends }) => friends);

  const [stateLoading, setStateLoading] = useState(false);

  useEffect(() => {
    if (loadingAdd === false) setStateLoading(false);
  }, [loadingAdd]);
  useEffect(() => {
    if (loadingAccept === false) setStateLoading(false);
  }, [loadingAccept]);
  useEffect(() => {
    if (loadingDelete === false) setStateLoading(false);
  }, [loadingDelete]);

  const acceptFriendHandler = () => {
    setStateLoading(true);
    dispatch(fetchAcceptFriend(id)).then(() => dispatch(getUserInfo(id)));
  };

  const addFriendHandler = () => {
    setStateLoading(true);
    dispatch(fetchAddFriend(id)).then(() => dispatch(getUserInfo(id)));
  };

  const deleteFriendHandler = () => {
    setStateLoading(true);
    console.log('deleteFriendHandler', id);
    dispatch(fetchDeleteFriend(id)).then(() => dispatch(fetchMyFriends()));
  };

  switch (friendStatus) {
    case 0:
      return (
        <button
          className={style.button}
          type="button"
          onClick={deleteFriendHandler}
        >
          {stateLoading && loadingDelete ? (
            <Preloader />
          ) : (
            <>
              <span className={style.button__text}>Удалить</span>
              <span className={style.button__sign}>-</span>
            </>
          )}
        </button>
      );

    case 1:
      return (
        <img
          className={style.sent}
          src={sent}
          alt="sent"
        />
      );

    case 2:
      return (
        <button
          className={style.button}
          type="button"
          onClick={acceptFriendHandler}
        >
          {stateLoading && loadingAccept ? (
            <Preloader />
          ) : (
            <>
              <span className={style.button__text}>Принять</span>
              <span className={style.button__sign}>+</span>
            </>
          )}
        </button>
      );

    case undefined:
      return (
        <button
          className={style.button}
          type="button"
          onClick={addFriendHandler}
        >
          {stateLoading && loadingAdd ? (
            <Preloader />
          ) : (
            <>
              <span className={style.button__text}>Добавить</span>
              <span className={style.button__sign}>+</span>
            </>
          )}
        </button>
      );

    default:
      return null;
  }
}

export default ButtonAddToFriend;
