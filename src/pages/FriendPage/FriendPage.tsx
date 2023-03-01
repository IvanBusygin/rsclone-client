import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './FriendPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { getFriendInfo, getFriendPosts } from '../../redux/thunks/friendPageThunk';
import PageHeader from '../../components/PageHeader/PageHeader';
import Post from '../../components/Post/Post';
import useResetAuth from '../../utils/useResetAuth';
import {
  addLikeBySocket,
  addPostBySocket,
  editPostBySocket,
  removeLikeBySocket,
  removePostBySocket,
} from '../../redux/slices/friendPageSlice';
import socket from '../../utils/socket';
import { LS_USER_ID } from '../../utils/constants';

const FriendPage = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const { info, posts, loadingPost } = useTypedSelector(({ friendPage }) => friendPage);

  const resetAuth = useResetAuth();
  useEffect(() => {
    resetAuth();
  }, [loadingPost, resetAuth]);

  const { id } = useParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getFriendInfo(id));
      dispatch(getFriendPosts(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

    if (id) {
      socket.emit('visit in', { userId: id, visitorId: USER_ID });
      socket.on('add post', (post) => {
        dispatch(addPostBySocket({ post }));
      });
      socket.on('edit post', (post) => {
        dispatch(editPostBySocket({ post }));
      });
      socket.on('remove post', (post) => {
        dispatch(removePostBySocket({ post }));
      });
      socket.on('add like', (like) => {
        dispatch(addLikeBySocket({ like }));
      });
      socket.on('remove like', (like) => {
        dispatch(removeLikeBySocket({ like }));
      });
    }
  }, [id, dispatch]);

  return (
    <div className={style.friendPage}>
      <PageHeader
        info={info}
        theme={isLightTheme}
      />
      <div className={style.friendPage__posts}>
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            firstName={info.firstName}
            lastName={info.lastName}
            avatar={info.avatar}
            text={post.text}
            time={post.date}
            editTime={post.lastEdit}
            likes={post.likes}
            comments={post.comments}
            canEdit={false}
            canComment
          />
        ))}
      </div>
    </div>
  );
};

export default FriendPage;
