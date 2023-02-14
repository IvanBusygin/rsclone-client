import React from 'react';
import style from './Wall.scss';
import PostsList from '../PostsList/PostsList';
import TextField from '../TextField/TextField';

const Wall = () => {
  return (
    <div className={style.wall}>
      <TextField />
      <PostsList />
    </div>
  );
};

export default Wall;
