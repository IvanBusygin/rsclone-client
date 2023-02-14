import React from 'react';
import style from './PostsList.scss';
import { useTypedSelector } from '../../redux/hooks';
import Post from '../Post/Post';

const PostsList = () => {
  const { posts } = useTypedSelector(({ myPage }) => myPage);

  return (
    <section className={style.posts}>
      {posts.map((post) => (
        <Post
          post={post.text}
          time={post.creationTime}
        />
      ))}
    </section>
  );
};

export default PostsList;
