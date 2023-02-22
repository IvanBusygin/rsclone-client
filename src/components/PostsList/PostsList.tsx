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
          firstName={firstName}
          lastName={lastName}
          avatar={avatar}
          text={post.text}
          time={post.date}
          likes={post.likes}
        />
      ))}
    </section>
  );
};

export default PostsList;
