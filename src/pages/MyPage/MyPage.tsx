import React from 'react';
import style from './MyPage.scss';
import MyPageHeader from '../../components/MyPageHeader/MyPageHeader';
import Wall from '../../components/Wall/Wall';
import FriendIconList from '../../components/FriendIconList/FriendIconList';
import EditButton from '../../components/EditButton/EditButton';

const MyPage = () => {
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
