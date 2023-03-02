import React, { useEffect, useState } from 'react';
import style from './MyPage.scss';
import PageHeaderContainer from '../../components/PageHeaderContainer/PageHeaderContainer';
import Wall from '../../components/Wall/Wall';
import FriendIconList from '../../components/FriendIconList/FriendIconList';
import EditButton from '../../components/EditButton/EditButton';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { getPersonInfo } from '../../redux/thunks/editPageThunks';
import { getPersonPosts } from '../../redux/thunks/myPageThunks';
import { fetchFriendIn, fetchMyFriends } from '../../redux/slices/friendsSlice';
import Modal from '../../components/Modal/Modal';
import useResetAuth from '../../utils/useResetAuth';
import socket from '../../utils/socket';
import {
  addCommentBySocket,
  addLikeBySocket,
  removeCommentBySocket,
  removeLikeBySocket,
} from '../../redux/slices/myPageSlice';

const MyPage = () => {
  const { error, loadingInfo } = useTypedSelector(({ myPage }) => myPage);

  const dispatch = useTypedDispatch();

  const [modal, setModal] = useState(false);

  const resetAuth = useResetAuth();
  useEffect(() => {
    resetAuth();
  }, [loadingInfo, resetAuth]);

  useEffect(() => {
    dispatch(getPersonInfo()).then(() => {
      dispatch(getPersonPosts()).then(() => {
        dispatch(fetchMyFriends()).then(() => dispatch(fetchFriendIn()));
      });
    });
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setModal(true);
    }
  }, [error]);

  useEffect(() => {
    socket.on('add comment', (comment) => {
      dispatch(addCommentBySocket({ comment }));
    });
    socket.on('remove comment', (comment) => {
      dispatch(removeCommentBySocket(comment));
    });
    socket.on('add like', (like) => {
      dispatch(addLikeBySocket({ like }));
    });
    socket.on('remove like', (like) => {
      dispatch(removeLikeBySocket({ like }));
    });
  }, [dispatch]);

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
