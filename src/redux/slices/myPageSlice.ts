import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState, IPostFromServer } from '../../types/myPage';
import {
  deletePersonPost,
  editPersonPost,
  getPersonPosts,
  postPersonPost,
} from '../thunks/myPageThunks';

const initialState: IMyPageState = {
  posts: [],
  isPostLoading: false,
  deletingPostId: '',
  editingPostId: '',
  savingPostId: '',
  successfullySavedPostId: '',
  error: '',
};

const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    editPost(state, action) {
      state.editingPostId = action.payload.postId;
      state.successfullySavedPostId = '';
    },
    unEditPost(state) {
      state.editingPostId = '';
    },
    resetError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPersonPosts.fulfilled, (state, action) => {
        state.posts = action.payload.map((post: IPostFromServer) => ({
          id: post._id,
          text: post.text,
          date: post.date,
          likes: structuredClone(post.likes),
          lastEdit: post.lastEdit,
        }));
      })
      .addCase(getPersonPosts.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(postPersonPost.pending, (state) => {
        state.isPostLoading = true;
      })
      .addCase(postPersonPost.fulfilled, (state, action) => {
        state.isPostLoading = false;

        const { _id: id, date, text, likes } = action.payload;
        state.posts.unshift({
          id,
          date,
          text,
          likes,
        });
      })
      .addCase(postPersonPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isPostLoading = false;
      })
      .addCase(deletePersonPost.pending, (state, action) => {
        state.deletingPostId = action.meta.arg;
      })
      .addCase(deletePersonPost.fulfilled, (state, action) => {
        state.deletingPostId = '';

        const { _id: id } = action.payload.postData;
        const idx = state.posts.findIndex((post) => post.id === id);

        if (idx !== -1) {
          state.posts.splice(idx, 1);
        }
      })
      .addCase(deletePersonPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.deletingPostId = '';
      })
      .addCase(editPersonPost.pending, (state, action) => {
        state.savingPostId = action.meta.arg.postId;
        state.editingPostId = '';
        state.successfullySavedPostId = '';
      })
      .addCase(editPersonPost.fulfilled, (state, action) => {
        state.savingPostId = '';
        state.successfullySavedPostId = action.payload._id;

        const { _id: id, date, text, likes, lastEdit } = action.payload;
        const idx = state.posts.findIndex((post) => post.id === id);

        const editedPost = {
          id,
          date,
          text,
          likes,
          lastEdit,
        };

        if (idx !== -1) {
          state.posts.splice(idx, 1, editedPost);
        }
      })
      .addCase(editPersonPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.savingPostId = '';
        state.successfullySavedPostId = '';
      }),
});

export const { editPost, unEditPost, resetError } = myPageSlice.actions;

export default myPageSlice.reducer;
