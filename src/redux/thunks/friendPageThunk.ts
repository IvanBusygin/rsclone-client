import { createAsyncThunk } from '@reduxjs/toolkit';
import { PERSON_GET_POSTS_URL, POST_COMMENT_URL, USER_GET_INFO_URL } from '../../utils/constants';
import { IFriendPostData } from '../../types/friendPage';
import reFetch from '../../utils/reFetch';
import { fetchRefresh } from '../slices/authSlice';

export const getFriendInfo = createAsyncThunk(
  'friendPage/getFriendInfo',
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

export const getFriendPosts = createAsyncThunk(
  'friendPage/getFriendPosts',
  async (friendId: string, { rejectWithValue, dispatch }) => {
    const response = await reFetch(`${PERSON_GET_POSTS_URL}/${friendId}`, 'GET');

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(`${PERSON_GET_POSTS_URL}/${friendId}`, 'GET');

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const postComment = createAsyncThunk(
  'friendPage/postComment',
  async (data: IFriendPostData, { rejectWithValue, dispatch }) => {
    const { postId, comment } = data;

    const response = await reFetch(POST_COMMENT_URL, 'POST', { comment, postId });

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(POST_COMMENT_URL, 'POST', { comment, postId });

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);

export const deleteComment = createAsyncThunk(
  'friendPage/deleteComment',
  async (data: { commentId: string; postId: string }, { rejectWithValue, dispatch }) => {
    const { commentId, postId } = data;
    const body = {
      commentId,
      postId,
    };

    const response = await reFetch(POST_COMMENT_URL, 'DELETE', body);

    if (response.ok) {
      return response.json();
    }

    const res = await response.json();

    if (res.code === 401) {
      await dispatch(fetchRefresh());

      const responseNew = await reFetch(POST_COMMENT_URL, 'DELETE', body);

      if (responseNew.ok) {
        return responseNew.json();
      }
    }

    return rejectWithValue(res.code);
  },
);
