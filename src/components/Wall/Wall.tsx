import React from 'react';
import style from './Wall.scss';
import PostsList from '../PostsList/PostsList';
import TextField from '../TextField/TextField';
import { postUserPost } from '../../redux/thunks/myPageThunks';
import { useTypedDispatch } from '../../redux/hooks';

const Wall = () => {
  const dispatch = useTypedDispatch();
  const onSendPostClick = (postText: string) => {
    dispatch(postUserPost(postText));
  };

  return (
    <div className={style.wall}>
      <TextField
        placeholder="Что у вас нового?"
        onButtonClick={onSendPostClick}
      />
      <PostsList />
    </div>
  );
};

export default Wall;
