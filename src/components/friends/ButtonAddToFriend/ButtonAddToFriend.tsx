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
  const [clicked, setClicked] = useState(false);

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
    dispatch(fetchAcceptFriend(id)).then(() => {
      dispatch(getUserInfo(id));
      setClicked(true);
    });
  };

  const addFriendHandler = () => {
    setStateLoading(true);
    dispatch(fetchAddFriend(id)).then(() => {
      dispatch(getUserInfo(id));
      setClicked(true);
    });
  };

  const deleteFriendHandler = () => {
    setStateLoading(true);
    dispatch(fetchDeleteFriend(id)).then(() => {
      dispatch(fetchMyFriends());
      setClicked(true);
    });
  };

  switch (friendStatus) {
    case 0:
      return (
        <button
          className={style.button}
          type="button"
          onClick={deleteFriendHandler}
          disabled={clicked}
        >
          {stateLoading && loadingDelete ? (
            <Preloader />
          ) : (
            <>
              <span className={style.button__text}>{!clicked ? 'Удалить' : 'Удален'}</span>
              <span className={style.button__sign}>{!clicked ? '-' : '🗸'}</span>
            </>
          )}
        </button>
      );

    case 1:
      return (
        <button
          className={style.button}
          type="button"
          disabled
        >
          <span className={style.button__text}>Отправлено</span>
          <span className={style.button__sign}> 🗸 </span>
        </button>
      );

    case 2:
      return (
        <button
          className={style.button}
          type="button"
          onClick={acceptFriendHandler}
          disabled={clicked}
        >
          {stateLoading && loadingAccept ? (
            <Preloader />
          ) : (
            <>
              <span className={style.button__text}>{!clicked ? 'Принять' : 'Принят'}</span>
              <span className={style.button__sign}>{!clicked ? '+' : '🗸'}</span>
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
          disabled={clicked}
        >
          {stateLoading && loadingAdd ? (
            <Preloader />
          ) : (
            <>
              <span className={style.button__text}> {!clicked ? 'Добавить' : 'Отправлено'} </span>
              <span className={style.button__sign}> {!clicked ? '+' : '🗸'} </span>
            </>
          )}
        </button>
      );

    default:
      return null;
  }
}

export default ButtonAddToFriend;
