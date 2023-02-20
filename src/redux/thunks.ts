import { CombinedState, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USER_INFO_URL, PATCH_USER_INFO_URL } from '../utils/constants';
import { IEditPageState } from '../types/editPage';

export const getUserInfo = createAsyncThunk('editPage/getUserInfo', async () => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem('vk-clone-accessToken') ?? '');
  const response = await fetch(GET_USER_INFO_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    credentials: 'include',
  });

  const userInfo = await response.json();
  console.log(userInfo);
  delete userInfo.user;

  return userInfo;
});

export const postUserInfo = createAsyncThunk('editPage/getUserInfo', async (_, { getState }) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem('vk-clone-accessToken') ?? '');
  const USER_ID = JSON.parse(localStorage.getItem('vk-clone-userID') ?? '');
  const {
    editPage: { infoData },
  } = getState() as CombinedState<{ editPage: IEditPageState }>;

  await fetch(PATCH_USER_INFO_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      userId: USER_ID,
      infoData,
    }),
  });
});
