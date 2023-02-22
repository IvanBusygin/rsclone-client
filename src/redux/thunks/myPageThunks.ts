import { CombinedState, createAsyncThunk } from '@reduxjs/toolkit';
import { IMyPageState } from '../../types/myPage';
import {
  LS_ACCESS_TOKEN,
  LS_USER_ID,
  USER_GET_POSTS_URL,
  USER_POST_URL,
} from '../../utils/constants';

export const getUserPosts = createAsyncThunk('myPage/getUserPosts', async () => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');
  const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

  const response = await fetch(`${USER_GET_POSTS_URL}/${USER_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
});

export const postUserPost = createAsyncThunk('myPage/postUserPost', async (_, { getState }) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');
  const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');
  const {
    myPage: { newPostText },
  } = getState() as CombinedState<{ myPage: IMyPageState }>;

  const response = await fetch(USER_POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },

    credentials: 'include',
    body: JSON.stringify({
      userId: USER_ID,
      post: {
        text: newPostText,
      },
    }),
  });

  const data = await response.json();

  return data;
});

export const deleteUserPost = createAsyncThunk('myPage/deleteUserPost', async (postId: string) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');

  const response = await fetch(USER_POST_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },

    credentials: 'include',
    body: JSON.stringify({
      postId,
    }),
  });

  const data = await response.json();

  return data;
});
