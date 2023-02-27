import React from 'react';
import style from './PostsList.scss';
import { useTypedSelector } from '../../redux/hooks';
import Post from '../Post/Post';

const PostsList = () => {
  const { posts } = useTypedSelector(({ myPage }) => myPage);
  const { firstName, lastName, avatar } = useTypedSelector(({ editPage }) => editPage.infoData);

  return (
    <section className={style.posts}>
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          firstName={firstName}
          lastName={lastName}
          avatar={avatar}
          text={post.text}
          time={post.date}
          editTime={post.lastEdit}
          likes={post.likes}
          comments={post.comments}
          canEdit
          canComment={false}
        />
      ))}
    </section>
  );
};

export default PostsList;
