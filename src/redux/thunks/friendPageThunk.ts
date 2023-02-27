import { createAsyncThunk } from '@reduxjs/toolkit';
import { LS_ACCESS_TOKEN, POST_COMMENT_URL, USER_GET_INFO_URL } from '../../utils/constants';
import { IFriendPostData } from '../../types/friendPage';

export const getFriendInfo = createAsyncThunk('friendPage/getFriendInfo', async (id: string) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');

  const response = await fetch(`${USER_GET_INFO_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    credentials: 'include',
  });

  const friendInfo = await response.json();
  delete friendInfo.info.user;

  return friendInfo;
});

export const postComment = createAsyncThunk(
  'friendPage/postComment',
  async (data: IFriendPostData) => {
    const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');
    const { postId, comment } = data;

    const response = await fetch(POST_COMMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        comment,
        postId,
      }),
    });

    const comments = await response.json();

    return comments;
  },
);
