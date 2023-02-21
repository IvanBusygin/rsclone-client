import { CombinedState, createAsyncThunk } from '@reduxjs/toolkit';
import { IMyPageState } from '../../types/myPage';
import { USER_POST_URL } from '../../utils/constants';

export default createAsyncThunk('myPage/postUserPost', async (_, { getState }) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem('vk-clone-accessToken') ?? '');
  const USER_ID = JSON.parse(localStorage.getItem('vk-clone-userID') ?? '');
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
