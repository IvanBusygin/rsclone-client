import React, { useEffect } from 'react';
import style from './MyPage.scss';
import MyPageHeader from '../../components/MyPageHeader/MyPageHeader';
import Wall from '../../components/Wall/Wall';
import FriendIconList from '../../components/FriendIconList/FriendIconList';
import EditButton from '../../components/EditButton/EditButton';
import { useTypedDispatch } from '../../redux/hooks';
import { getUserInfo } from '../../redux/thunks/editPageThunks';

const MyPage = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div className={style.myPage}>
      <MyPageHeader />
      <Wall />
      <div className={style.myPage__rightSide}>
        <EditButton />
        <FriendIconList />
      </div>
    </div>
  );
};

export default MyPage;
