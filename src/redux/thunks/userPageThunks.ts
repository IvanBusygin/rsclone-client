import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_GET_INFO_URL } from '../../utils/constants';
import reFetch from '../../utils/reFetch';
import { fetchRefresh } from '../slices/authSlice';

export default createAsyncThunk(
  'userPage/getUserInfo',
  async (id: string, { rejectWithValue, dispatch }) => {
    const response = await reFetch(`${USER_GET_INFO_URL}/${id}`, 'GET');

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(`${USER_GET_INFO_URL}/${id}`, 'GET');

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);
