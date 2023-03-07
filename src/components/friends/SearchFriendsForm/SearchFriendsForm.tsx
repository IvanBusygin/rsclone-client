import React, { useEffect } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './SearchFriendsForm.scss';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { fetchSearch } from '../../../redux/slices/friendsSlice';
import { IFormSearch } from '../../../types/friends';
import Preloader from '../../Preloader/Preloader';
import FriendCardFound from '../FriendCards/FriendCardFound';
import useResetAuth from '../../../utils/useResetAuth';
import { LS_USER_ID } from '../../../utils/constants';

enum ErrorMsg {
  searchInput = 'Введите строку поиска',
}

const SearchFriendsForm = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.searchForm_light : style.searchForm_dark;

  const dispatch = useTypedDispatch();
  const { loadingSearch, dataPeoples } = useTypedSelector(({ friends }) => friends);

  const resetAuth = useResetAuth();
  useEffect(() => {
    resetAuth();
  }, [loadingSearch, resetAuth]);

  const searchHandler: SubmitHandler<IFormSearch> = (data) => {
    dispatch(fetchSearch(data));
  };

  const { register, handleSubmit, setFocus } = useForm<IFormSearch>({});

  useEffect(() => {
    setFocus('searchInput');
  }, [setFocus]);

  const ownID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

  const dataUsers = dataPeoples.filter((user) => {
    return user.friendStatus !== 0 && user.user._id !== ownID;
  });

  return (
    <>
      <form
        className={classNames(style.searchForm, themeClass)}
        onSubmit={handleSubmit(searchHandler)}
      >
        <input
          className={style.searchForm__field}
          type="text"
          placeholder="Логин, имя или город"
          {...register('searchInput', {
            required: ErrorMsg.searchInput,
          })}
        />
        <button
          type="submit"
          className={style.searchForm__button}
        >
          {loadingSearch ? <Preloader /> : 'Найти'}
        </button>
      </form>
      {dataUsers.map((human) => (
        <FriendCardFound
          key={human.user._id}
          {...human}
        />
      ))}
    </>
  );
};

export default SearchFriendsForm;
