import React from 'react';
import style from './Logout.scss';
import exit from '../../assets/img/svg/exit.svg';
import exitWhite from '../../assets/img/svg/exit-white.svg';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { fetchLogout } from '../../redux/slices/authSlice';
import useResetAuth from '../../utils/useResetAuth';

function Logout() {
  const { isLightTheme } = useTypedSelector(({ common }) => common);

  const dispatch = useTypedDispatch();
  const resetAuth = useResetAuth();

  const clickHandler = () => {
    dispatch(fetchLogout()).then(() => {
      resetAuth();
    });
  };

  return (
    <button
      className={style.button}
      onClick={clickHandler}
      type="button"
    >
      <img
        className={style.img}
        src={isLightTheme ? exit : exitWhite}
        alt="exit"
      />
    </button>
  );
}

export default Logout;
