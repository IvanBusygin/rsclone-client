import { createAsyncThunk } from '@reduxjs/toolkit';
import { LS_ACCESS_TOKEN, USER_GET_INFO_URL } from '../../utils/constants';

export default createAsyncThunk('friendPage/getFriendInfo', async (id: string) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');
  console.log(id);

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
