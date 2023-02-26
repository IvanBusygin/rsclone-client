import React, { useEffect, useState } from 'react';
import style from './MyPage.scss';
import MyPageHeader from '../../components/MyPageHeader/MyPageHeader';
import Wall from '../../components/Wall/Wall';
import FriendIconList from '../../components/FriendIconList/FriendIconList';
import EditButton from '../../components/EditButton/EditButton';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { getUserInfo } from '../../redux/thunks/editPageThunks';
import { getUserPosts } from '../../redux/thunks/myPageThunks';
import { fetchFriendIn } from '../../redux/slices/friendsSlice';
import Modal from '../../components/Modal/Modal';

const MyPage = () => {
  const { error } = useTypedSelector(({ myPage }) => myPage);

  const dispatch = useTypedDispatch();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getUserPosts());
    dispatch(fetchFriendIn());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setModal(true);
    }
  }, [error]);

  return (
    <div className={style.myPage}>
      <MyPageHeader />
      <Wall />
      <Modal
        isOpen={modal}
        setModal={setModal}
        message={error}
      />
      <div className={style.myPage__rightSide}>
        <EditButton />
        <FriendIconList />
      </div>
    </div>
  );
};

export default MyPage;
