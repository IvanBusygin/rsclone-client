import React, { useEffect, useState } from 'react';
import Preloader from '../../Preloader/Preloader';
import { fetchAddFriend } from '../../../redux/slices/friendsSlice';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import style from './ButtonAddToFriend.scss';

interface IProps {
  id: string;
}

function ButtonAddToFriend(props: IProps) {
  const { id } = props;

  const dispatch = useTypedDispatch();
  const { loadingAdd } = useTypedSelector(({ friends }) => friends);

  const [stateLoading, setStateLoading] = useState(false);

  useEffect(() => {
    if (loadingAdd === false) setStateLoading(false);
  }, [loadingAdd]);

  const addHandler = () => {
    setStateLoading(true);
    dispatch(fetchAddFriend(id));
  };

  return (
    <button
      className={style.button}
      type="button"
      onClick={addHandler}
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
}

export default ButtonAddToFriend;
