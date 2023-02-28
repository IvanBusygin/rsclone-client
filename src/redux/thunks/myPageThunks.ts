import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LS_USER_ID,
  PERSON_GET_POSTS_URL,
  PERSON_POST_URL,
  POST_LIKE_URL,
} from '../../utils/constants';
import reFetch from '../../utils/reFetch';
import { fetchRefresh } from '../slices/authSlice';

export const getPersonPosts = createAsyncThunk(
  'myPage/getUserPosts',
  async (_, { rejectWithValue, dispatch }) => {
    const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

    const response = await reFetch(`${PERSON_GET_POSTS_URL}/${USER_ID}`, 'GET');

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(`${PERSON_GET_POSTS_URL}/${USER_ID}`, 'GET');

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const postPersonPost = createAsyncThunk(
  'myPage/postUserPost',
  async (postText: string, { rejectWithValue, dispatch }) => {
    const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');
    const body = {
      userId: USER_ID,
      post: {
        text: postText,
      },
    };

    const response = await reFetch(PERSON_POST_URL, 'POST', body);

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(PERSON_POST_URL, 'POST', body);

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const deletePersonPost = createAsyncThunk(
  'myPage/deleteUserPost',
  async (postId: string, { rejectWithValue, dispatch }) => {
    const response = await reFetch(PERSON_POST_URL, 'DELETE', { postId });

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(PERSON_POST_URL, 'DELETE', { postId });

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const editPersonPost = createAsyncThunk(
  'myPage/editUserPost',
  async (
    { postId, newPostText }: { postId: string; newPostText: string },
    { rejectWithValue, dispatch },
  ) => {
    const body = {
      postId,
      post: {
        text: newPostText,
      },
    };

    const response = await reFetch(PERSON_POST_URL, 'PATCH', body);

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(PERSON_POST_URL, 'PATCH', body);

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const addLike = createAsyncThunk(
  'myPage/addLike',
  async (postId: string, { rejectWithValue, dispatch }) => {
    const body = {
      postId,
    };

    const response = await reFetch(POST_LIKE_URL, 'POST', body);

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(POST_LIKE_URL, 'POST', body);

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);
