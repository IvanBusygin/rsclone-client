import React, { useEffect, useState } from 'react';
import style from './MyPage.scss';
import PageHeaderContainer from '../../components/PageHeaderContainer/PageHeaderContainer';
import Wall from '../../components/Wall/Wall';
import FriendIconList from '../../components/FriendIconList/FriendIconList';
import EditButton from '../../components/EditButton/EditButton';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { getPersonInfo } from '../../redux/thunks/editPageThunks';
import { getPersonPosts } from '../../redux/thunks/myPageThunks';
import { fetchFriendIn } from '../../redux/slices/friendsSlice';
import Modal from '../../components/Modal/Modal';

const MyPage = () => {
  const { error } = useTypedSelector(({ myPage }) => myPage);

  const dispatch = useTypedDispatch();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getPersonInfo());
    dispatch(getPersonPosts());
    dispatch(fetchFriendIn());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setModal(true);
    }
  }, [error]);

  return (
    <div className={style.myPage}>
      <PageHeaderContainer />
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
