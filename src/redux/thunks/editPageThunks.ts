import { CombinedState, createAsyncThunk } from '@reduxjs/toolkit';
import { LS_ACCESS_TOKEN, LS_USER_ID, USER_INFO_URL } from '../../utils/constants';
import { IEditPageState } from '../../types/editPage';

export const getUserInfo = createAsyncThunk('editPage/getUserInfo', async () => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');
  const response = await fetch(USER_INFO_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    credentials: 'include',
  });

  const userInfo = await response.json();
  delete userInfo.user;

  return userInfo;
});

export const postUserInfo = createAsyncThunk('editPage/postUserInfo', async (_, { getState }) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');
  const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');
  const {
    editPage: { infoData },
  } = getState() as CombinedState<{ editPage: IEditPageState }>;

  await fetch(USER_INFO_URL, {
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
