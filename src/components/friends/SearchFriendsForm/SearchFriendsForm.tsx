import React, { useEffect } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './SearchFriendsForm.scss';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { fetchSearch } from '../../../redux/slices/friendsSlice';
import { IForm } from '../../../types/friends';
import Preloader from '../../Preloader/Preloader';
import FriendCardFound from '../FriendCards/FriendCardFound';
import useResetAuth from '../../../utils/useResetAuth';

enum ErrorMsg {
  searchInput = 'Введите строку поиска',
}

const SearchFriendsForm = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.searchForm_light : style.searchForm_dark;

  const dispatch = useTypedDispatch();
  const { loadingSearch, dataPeople } = useTypedSelector(({ friends }) => friends);

  const resetAuth = useResetAuth();

  useEffect(() => {
    resetAuth();
  }, [loadingSearch, resetAuth]);

  const searchHandler: SubmitHandler<IForm> = (data) => {
    dispatch(fetchSearch(data));
  };

  const { register, handleSubmit, setFocus } = useForm<IForm>({});

  useEffect(() => {
    setFocus('searchInput');
  }, [setFocus]);

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
      {dataPeople.map((human) => (
        <FriendCardFound
          key={human._id}
          {...human}
        />
      ))}
    </>
  );
};

export default SearchFriendsForm;
