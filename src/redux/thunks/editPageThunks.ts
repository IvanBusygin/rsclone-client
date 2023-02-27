import { CombinedState, createAsyncThunk } from '@reduxjs/toolkit';
import { LS_USER_ID, PERSON_GET_INFO_URL } from '../../utils/constants';
import { IEditPageState } from '../../types/editPage';
import reFetch from '../../utils/reFetch';
import { fetchRefresh } from '../slices/authSlice';

export const getPersonInfo = createAsyncThunk(
  'editPage/getUserInfo',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await reFetch(PERSON_GET_INFO_URL, 'GET');

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(PERSON_GET_INFO_URL, 'GET');

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const postPersonInfo = createAsyncThunk(
  'editPage/postUserInfo',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const {
      editPage: { infoData },
    } = getState() as CombinedState<{ editPage: IEditPageState }>;

    const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

    const body = {
      userId: USER_ID,
      infoData,
    };

    const response = await reFetch(PERSON_GET_INFO_URL, 'PATCH', body);

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(PERSON_GET_INFO_URL, 'PATCH', body);

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);
