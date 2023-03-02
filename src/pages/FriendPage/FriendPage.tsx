import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './FriendPage.scss';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { getFriendInfo, getFriendPosts } from '../../redux/thunks/friendPageThunk';
import PageHeader from '../../components/PageHeader/PageHeader';
import Post from '../../components/Post/Post';
import useResetAuth from '../../utils/useResetAuth';

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

  return (
    <div className={style.friendPage}>
      <PageHeader
        info={info}
        theme={isLightTheme}
      />
      <div className={style.friendPage__posts}>
        {posts &&
          posts.map((post) => (
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
