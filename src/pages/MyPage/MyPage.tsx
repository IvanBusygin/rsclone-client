import React from 'react';
import style from './MyPage.scss';
import MyPageHeader from '../../components/MyPageHeader/MyPageHeader';
import Wall from '../../components/Wall/Wall';
import FriendList from '../../components/FriendList/FriendList';
import InfoButton from '../../components/SettingsButton/InfoButton';

const MyPage = () => {
  return (
    <div className={style.myPage}>
      <MyPageHeader />
      <Wall />
      <div className={style.myPage__rightSide}>
        <InfoButton />
        <FriendList />
      </div>
    </div>
  );
};

export default MyPage;
