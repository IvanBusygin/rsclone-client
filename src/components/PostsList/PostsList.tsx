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
          key={post.id}
          text={post.text}
          time={post.date}
        />
      ))}
    </section>
  );
};

export default PostsList;
