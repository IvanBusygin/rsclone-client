import { createAsyncThunk } from '@reduxjs/toolkit';
import reFetch from '../../utils/reFetch';
import { CHATS_URL } from '../../utils/constants';
import { fetchRefresh } from '../slices/authSlice';

export const createChat = createAsyncThunk(
  'messenger/createChat',
  async (friendId: string, { rejectWithValue, dispatch }) => {
    const body = { friendId };

    const response = await reFetch(CHATS_URL, 'POST', body);

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(CHATS_URL, 'POST', body);

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const getChats = createAsyncThunk(
  'messenger/getChats',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await reFetch(CHATS_URL, 'GET');

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(CHATS_URL, 'GET');

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const getChat = createAsyncThunk(
  'messenger/getChat',
  async (chatId: string, { rejectWithValue, dispatch }) => {
    const response = await reFetch(`${CHATS_URL}/${chatId}`, 'GET');

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(`${CHATS_URL}/${chatId}`, 'GET');

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);
